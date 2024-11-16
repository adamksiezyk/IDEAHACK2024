from node2vec import Node2Vec

import json
import networkx as nx
import matplotlib.pyplot as plt
from networkx.readwrite import json_graph

# Load the JSON file
input_file = 'data/enriched_graph_nx.json'
with open(input_file, 'r') as f:
    data = json.load(f)


def get_closest_matches_by_type(node_id, embeddings, graph, target_type, top_k=5):
    """
    Finds the top_k closest matches of a specific type in the graph based on embeddings.

    Parameters:
        node_id (str): The ID of the query node.
        embeddings (dict): A dictionary of node embeddings (node_id -> embedding vector).
        graph (networkx.Graph): The graph containing nodes and their attributes.
        target_type (str): The target node type to filter for (e.g., "researcher").
        top_k (int): Number of closest matches to return.

    Returns:
        List of tuples: [(node_id, similarity_score), ...] of the specific type.
    """
    if node_id not in embeddings:
        raise ValueError(f"Node {node_id} not found in embeddings.")

    query_embedding = embeddings[node_id].reshape(1, -1)  # Query node embedding

    # Filter nodes by the target type
    target_nodes = [
        node for node, attributes in graph.nodes(data=True) if attributes.get("type") == target_type
    ]

    # Extract embeddings for target nodes
    target_embeddings = {node: embeddings[node] for node in target_nodes if node in embeddings}

    # Compute cosine similarities for target nodes
    all_target_nodes = list(target_embeddings.keys())
    all_target_embeddings = np.array([target_embeddings[node] for node in all_target_nodes])

    from sklearn.neighbors import NearestNeighbors

    # Use NearestNeighbors for approximate matching
    neigh = NearestNeighbors(n_neighbors=top_k, metric='cosine')
    # all_target_embeddings = np.stack(target_embeddings.values())
    neigh.fit(all_target_embeddings)

    # Query the nearest neighbors
    distances, indices = neigh.kneighbors(query_embedding)

    # Get the closest nodes and similarities
    closest_matches = [(list(target_embeddings.keys())[idx], 1 - dist) for idx, dist in zip(indices[0], distances[0])]


    # similarities = cosine_similarity(query_embedding, all_target_embeddings).flatten()
    #
    # # Create a list of nodes with their similarity scores
    # scores = list(zip(all_target_nodes, similarities))
    #
    # # Sort by similarity in descending order, exclude the query node itself
    # scores = sorted(scores, key=lambda x: x[1], reverse=True)
    # closest_matches = [(node, score) for node, score in scores if node != node_id][:top_k]
    #
    return closest_matches


from node2vec import Node2Vec
import numpy as np

# Step 1: Dynamically update edge weights based on user preferences
def update_edge_weights(graph, prioritize_relationship):
    """
    Updates edge weights based on the relationship to prioritize.
    """
    for u, v, data in graph.edges(data=True):
        if data.get('relationship_type') == prioritize_relationship:
            graph[u][v]['weight'] = 5  # Higher weight for prioritized edges
        else:
            graph[u][v]['weight'] = 1  # Default weight for other edges

# Convert JSON to a NetworkX graph, explicitly set edges="edges"
graph = json_graph.node_link_graph(data, directed=data.get("directed", False))

# Example: Prioritize "EXPERT_IN" edges
update_edge_weights(graph, prioritize_relationship="AFFILIATED_WITH")

node2vec = Node2Vec(graph, dimensions=15, walk_length=10, num_walks=80, workers=4)
model = node2vec.fit(window=5, min_count=1, batch_words=4)


# To get all node embeddings as a dictionary
node_embeddings = {node: model.wv[node] for node in graph.nodes()}


# Example Usage
# Assume `node_embeddings` is a dictionary of node embeddings and `graph` is your NetworkX graph
node_id = 'r3'  # Query node
target_type = 'researcher'  # Target type (e.g., researchers)
top_k = 4  # Number of closest matches to find
closest_researchers = get_closest_matches_by_type(node_id, node_embeddings, graph, target_type, top_k=top_k)

# Print results
print(f"Top {top_k} closest {target_type}s to node {node_id}:")
for match, similarity in closest_researchers:
    print(f"Node: {match}, Similarity: {similarity:.4f}")

# Initialize set for subgraph nodes
# subgraph_nodes = set(["r1"] + closest_researchers)
top_3_nodes = [node for node, _ in closest_researchers]  # Extract only the node IDs

# Initialize set for subgraph nodes
subgraph_nodes = set(["r1"] + top_3_nodes)

# Find shortest paths to include intermediary nodes
for target_node in top_3_nodes:
    if nx.has_path(graph, "r1", target_node):  # Ensure path exists
        path = nx.shortest_path(graph, source="r1", target=target_node)  # Shortest path
        print(path)
        subgraph_nodes.update(path)  # Add all nodes in the path

# Create the subgraph
subgraph = graph.subgraph(subgraph_nodes).copy()

# Print the subgraph information
print(f"Subgraph includes researchers and intermediaries: {subgraph_nodes}")
print(f"Connections: {list(subgraph.edges(data=True))}")

# Save the subgraph to a JSON file
output_subgraph_path = "data/top_3_similar_subgraph_with_intermediaries.json"
with open(output_subgraph_path, "w") as f:
    subgraph_data = nx.node_link_data(subgraph)
    json.dump(subgraph_data, f, indent=4)

print(f"Subgraph saved to {output_subgraph_path}")