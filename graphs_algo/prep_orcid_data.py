import json
import requests

# Replace with your ORCID Public API client credentials
CLIENT_ID = 'APP-1W00QPNCPF1VK3WB'
CLIENT_SECRET = 'b315dfef-4e95-4644-935c-177194a435e5'
BASE_URL = 'https://pub.orcid.org/v3.0'


# Function to get access token
def get_access_token(client_id, client_secret):
    """Fetch the access token for the ORCID Public API."""
    token_url = 'https://orcid.org/oauth/token'
    payload = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'client_credentials',
        'scope': '/read-public'
    }
    response = requests.post(token_url, data=payload)
    response.raise_for_status()
    return response.json()['access_token']


# Function to fetch a researcher's public record
def get_researcher_record(orcid_id, access_token):
    """Retrieve the public data of a researcher by ORCID ID."""
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }
    record_url = f'{BASE_URL}/{orcid_id}'
    response = requests.get(record_url, headers=headers)
    response.raise_for_status()
    return response.json()


# Function to process a researcher record and return a summary
def process_researcher(orcid_id, researcher_data):
    """
    Process a single researcher's data and return a formatted dictionary.

    Args:
        orcid_id (str): The ORCID ID of the researcher.
        researcher_data (dict): Data fetched from the ORCID API.

    Returns:
        dict: Processed data for the researcher.
    """
    person_data = researcher_data.get("person", {})
    name = person_data.get("name", {})
    given_name = name.get("given-names", {}).get("value", "Unknown")
    family_name = name.get("family-name", {}).get("value", "Unknown")
    full_name = f"{given_name} {family_name}"

    return {
        "orcid": orcid_id,
        "name": full_name,
        "works": researcher_data.get("activities-summary", {}).get("works", {}).get("group", [])
    }


# Main function to process ORCID IDs and save results
def process_orcids(orcid_file, output_file):

    """
    Reads ORCID IDs from a file, processes each one, and saves the results.

    Args:
        orcid_file (str): Path to the file containing ORCID IDs.
        output_file (str): Path to save the processed results.
    """
    # Load ORCID IDs from file
    with open(orcid_file, "r") as f:
        orcid_ids = json.load(f)
    print(len(orcid_ids))
    # Get access token
    token = get_access_token(CLIENT_ID, CLIENT_SECRET)

    # Process each ORCID ID
    processed_data = []
    for orcid_id in orcid_ids:
        try:
            print(f"Processing ORCID ID: {orcid_id}")
            researcher_data = get_researcher_record(orcid_id, token)
            processed_data.append(process_researcher(orcid_id, researcher_data))
        except requests.exceptions.RequestException as e:
            print(f"Error processing ORCID ID {orcid_id}: {e}")

    # Save the processed data to a file
    with open(output_file, "w") as f:
        json.dump(processed_data, f, indent=4)

    print(f"Processed data for {len(processed_data)} researchers. Saved to '{output_file}'.")


if __name__ == "__main__":
    # File containing ORCID IDs (generated previously)
    orcid_file = "researcher_orcids.json"

    # Output file for processed data
    output_file = "processed_researcher_data.json"

    # Process the ORCID IDs and save results
    process_orcids(orcid_file, output_file)
