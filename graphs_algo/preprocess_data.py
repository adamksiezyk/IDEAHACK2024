"""
Preprocess data - read json researchers and add nodes for patents, publications etc.
"""


import json
import networkx as nx

# Load JSON data
with open('data/enriched_graph_nx.json', 'r') as f:
    data = json.load(f)

# Initialize the graph
graph = nx.DiGraph()

# Function to add a node if it doesn't exist and create a relationship
def add_node_and_edge(graph, node_id, node_data, from_node, relationship_type):
    if not graph.has_node(node_id):
        graph.add_node(node_id, **node_data)
    graph.add_edge(from_node, node_id, relationship_type=relationship_type)

# Process nodes to find researchers and ensure all related entities are added
for node in data["nodes"]:
    if node.get("type") == "researcher":
        researcher_id = node["id"]
        graph.add_node(researcher_id, **node)  # Add researcher node

        # Add institutions as nodes
        if "institution" in node:
            institution_id = f"inst_{node['institution'].replace(' ', '_')}"
            add_node_and_edge(
                graph, institution_id,
                {"name": node["institution"], "type": "institution"},
                researcher_id, "AFFILIATED_WITH"
            )

        # Add patents as nodes
        for patent_id in node.get("patents", []):
            add_node_and_edge(
                graph, patent_id,
                {"type": "patent"},
                researcher_id, "HOLDS_PATENT"
            )

        # Add skills as nodes
        for skill in node.get("skills", []):
            skill_id = f"skill_{skill.replace(' ', '_')}"
            add_node_and_edge(
                graph, skill_id,
                {"name": skill, "type": "skill"},
                researcher_id, "HAS_SKILL"
            )

        # Add project history as nodes
        for project_id in node.get("projectHistory", []):
            add_node_and_edge(
                graph, project_id,
                {"type": "project"},
                researcher_id, "WORKED_ON"
            )

        # Add education (institution and degree)
        for education in node.get("education", []):
            edu_inst_id = f"edu_{education['institution'].replace(' ', '_')}"
            edu_data = {
                "institution": education["institution"],
                "degree": education["degree"],
                "field": education["field"],
                "type": "education",
            }
            add_node_and_edge(
                graph, edu_inst_id, edu_data,
                researcher_id, "STUDIED_AT"
            )

        # Add preferred industries as nodes
        for industry in node.get("preferredIndustries", []):
            industry_id = f"industry_{industry.replace(' ', '_')}"
            add_node_and_edge(
                graph, industry_id,
                {"name": industry, "type": "industry"},
                researcher_id, "INTERESTED_IN"
            )

        # Add expertise as nodes
        for expertise in node.get("expertise", []):
            expertise_id = f"expertise_{expertise.replace(' ', '_')}"
            add_node_and_edge(
                graph, expertise_id,
                {"name": expertise, "type": "expertise"},
                researcher_id, "EXPERT_IN"
            )

# Save or visualize the graph
print(f"Graph now has {graph.number_of_nodes()} nodes and {graph.number_of_edges()} edges.")

# Convert the graph to node-link data
from networkx.readwrite import json_graph
graph_data = json_graph.node_link_data(graph)

# Save the graph to a JSON file
output_file = "data/enriched_graph_nx.json"
with open(output_file, "w") as f:
    json.dump(graph_data, f, indent=4)

print(f"Graph saved to {output_file} in NetworkX JSON format.")
