import axios from 'axios';

const BASE_URL = "https://api.fda.gov/drug/ndc.json";

async function fetchFromAPI(url) {
    console.log("Fetching from URL:", url);

    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
        return null;
    }
}

async function getByPartialNameAndStrength(partialName, strength, desiredRoute) {
    let url = `${BASE_URL}?search=generic_name:"${partialName}"`;

    if (desiredRoute) {
        url += ` AND route:"${desiredRoute}"`;
    }

    url += `&limit=10`;

    const fullResults = await fetchFromAPI(url);

    if (fullResults) {
        const filteredResults = fullResults.filter(record => {
            if (desiredRoute) {
                return record.route && record.route.includes(desiredRoute);
            }
            return true;
        });

        return filteredResults.map(record => ({
            product_ndc: record.product_ndc,
            generic_name: record.generic_name,
            labeler_name: record.labeler_name,
            brand_name: record.brand_name,
            dosage_form: record.dosage_form,
            route: record.route,
            pharm_class: record.pharm_class
        }));
    }
    return null;
}

export { getByPartialNameAndStrength };