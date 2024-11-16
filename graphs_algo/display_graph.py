import json
import networkx as nx
import matplotlib.pyplot as plt
from networkx.readwrite import json_graph

# Load the JSON file
# input_file = 'data/enriched_graph_nx.json'
input_file = 'data/top_3_similar_subgraph_with_intermediaries.json'
with open(input_file, 'r') as f:
    data = json.load(f)

# Convert JSON to a NetworkX graph, explicitly set edges="edges"
graph = json_graph.node_link_graph(data, directed=data.get("directed", False))


# FILTERING ==============================
# Define the researcher of interest
# # Define the researcher of interest
# researcher_id = 'r1'
#
# # Get the neighbors of the researcher node (directly connected nodes)
# neighbors = list(graph.neighbors(researcher_id))
#
# # Include the researcher node itself
# filtered_nodes = [researcher_id] + neighbors
#
# # Create a subgraph with the researcher and its neighbors
# graph = graph.subgraph(filtered_nodes).copy()

# Get the immediate child nodes (outgoing edges from `r1`)
# child_nodes = [v for u, v in graph.out_edges(researcher_id)]
#
# # Include `r1` itself in the filtered graph
# filtered_nodes = [researcher_id] + child_nodes
#
# # Create a subgraph with the researcher and its child nodes
# graph = graph.subgraph(filtered_nodes).copy()


# for node, attributes in graph.nodes(data=True):
#     node_type = attributes.get("type", "unknown")
#
#  # Filter nodes for scientists (e.g., type = 'researcher')
# scientist_nodes = [n for n, attr in graph.nodes(data=True) if attr.get('type') == 'patent']
#
# # Create a subgraph containing only the scientist nodes and their connections
# graph = graph.subgraph(scientist_nodes).copy()



# Position the nodes using a layout
pos = nx.spring_layout(graph)  # You can experiment with other layouts

# Extract node colors based on types
node_colors = []
for node, attributes in graph.nodes(data=True):
    node_type = attributes.get("type", "unknown")
    if node_type == "researcher":
        node_colors.append("blue")
    elif node_type == "institution":
        node_colors.append("green")
    elif node_type == "patent":
        node_colors.append("orange")
    elif node_type == "skill":
        node_colors.append("cyan")
    elif node_type == "project":
        node_colors.append("red")
    elif node_type == "education":
        node_colors.append("purple")
    elif node_type == "industry":
        node_colors.append("yellow")
    elif node_type == "expertise":
        node_colors.append("magenta")
    else:
        node_colors.append("gray")

# Draw the graph
plt.figure(figsize=(12, 8))
nx.draw(
    graph,
    pos,
    with_labels=True,
    node_color=node_colors,
    edge_color='black',
    node_size=800,
    font_size=8,
    font_color='black',
    font_weight='bold'
)

# Add edge labels
edge_labels = nx.get_edge_attributes(graph, 'relationship_type')
nx.draw_networkx_edge_labels(graph, pos, edge_labels=edge_labels, font_size=8)

# Display the plot
plt.title("Graph Visualization")
plt.show()
