import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from ast import literal_eval
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle 
import googleapiclient.discovery
import google.auth 
from google.cloud import firestore
from google.cloud import storage

def get_recommendations(title,rating_range=(0, 10)):
    client = storage.Client()
    anime_df = pd.read_csv('gs://anime12345/anime.csv')
    anime_df = anime_df.reset_index()
    indices = pd.Series(anime_df.index, index=anime_df['Title'])
    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(anime_df['sauce'])
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    idx = indices[title]
    min_rating, max_rating = rating_range
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:12]
    movie_indices = [i[0] for i in sim_scores]
    recommended_animes = anime_df.iloc[movie_indices]
    return recommended_animes[(recommended_animes['Rating'] >= min_rating) & (recommended_animes['Rating'] <= max_rating)][['Anime_id', 'Title', 'Genre', 'Rating', 'Link']]

def generate_recommendations_with_title(event, context):
    db = firestore.Client(project="animecompass-453ef")
    path_parts = context.resource.split('/documents/')[1].split('/')
    collection_path = path_parts[0]
    # collections = db.collection(collection_path).document(u'inputGenres').get()
    collections = db.collection(u'Genre').document(u'inputTitle');
    doc = collections.get()
    title = doc.get("Title")
    res_df=get_recommendations(title)
    doc_ref = db.collection(u'recommended_anime').document(u'result')

    # Select only the desired columns
    filtered_df = res_df[['Title', 'Genre', 'Rating', 'Link']]
# Convert the filtered DataFrame to an array of dictionaries
    recommendations = filtered_df.to_dict(orient='records')

# Save the details to Firestore
    doc_ref.set({
    u'recommendations': recommendations
    })