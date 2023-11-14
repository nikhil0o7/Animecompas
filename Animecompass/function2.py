import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import googleapiclient.discovery
import google.auth 
from google.cloud import firestore
from google.cloud import storage

def get_genre_recommendations(genres, rating_range=(0, 10)):
    client = storage.Client()
    anime_df = pd.read_csv('gs://anime12345/anime.csv')
    anime_df = anime_df.reset_index()
    # Convert the list of genres to a single string
    genre_str = genres
    tfidf_genre = TfidfVectorizer(stop_words='english')
    tfidf_genre_matrix = tfidf_genre.fit_transform(anime_df['Genre_str'])
    # Vectorize the passed genre string
    genre_vector = tfidf_genre.transform([genre_str])
    cosine_sim_genre = linear_kernel(tfidf_genre_matrix, tfidf_genre_matrix)
    
    # Compute the cosine similarities
    sim_scores = linear_kernel(genre_vector, tfidf_genre_matrix).flatten()
    
    # Get sorted anime indices based on the similarity scores
    sorted_anime_indices = sim_scores.argsort()[::-1]

    # Filter top 15
    sorted_anime_indices = sorted_anime_indices[1:11]
    
    recommended_animes = anime_df.iloc[sorted_anime_indices]
    return recommended_animes[(recommended_animes['Rating'] >= rating_range[0]) & (recommended_animes['Rating'] <= rating_range[1])]

def generate_recommendations_with_title(event, context):
    db = firestore.Client(project="animecompass-453ef")
    path_parts = context.resource.split('/documents/')[1].split('/')
    collection_path = path_parts[0]

    # collections = db.collection(collection_path).document(u'inputGenres').get()
    collections = db.collection(u'Genre').document(u'inputGenres');

    doc = collections.get()
    genres = doc.get("Genre")
    
    res_df=get_genre_recommendations(genres)
    doc_ref = db.collection(u'recommended_anime').document(u'genre_result')

    # Select only the desired columns
    filtered_df = res_df[['Title', 'Genre', 'Rating', 'Link']]
    # Convert the filtered DataFrame to an array of dictionaries
    recommendations = filtered_df.to_dict(orient='records')
# Save the details to Firestore
    doc_ref.set({
    u'recommendations': recommendations
    })