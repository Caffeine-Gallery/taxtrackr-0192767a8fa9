import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addTaxPayerForm = document.getElementById('addTaxPayerForm');
    const searchButton = document.getElementById('searchButton');
    const taxPayerList = document.getElementById('taxPayerList');
    const searchResult = document.getElementById('searchResult');

    addTaxPayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('tid').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;

        await backend.addTaxPayer(tid, firstName, lastName, address);
        addTaxPayerForm.reset();
        await updateTaxPayerList();
    });

    searchButton.addEventListener('click', async () => {
        const searchTid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(searchTid);
        
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with the given TID.</p>';
        }
    });

    async function updateTaxPayerList() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(taxPayer => {
            const li = document.createElement('li');
            li.textContent = `${taxPayer.tid}: ${taxPayer.firstName} ${taxPayer.lastName}`;
            taxPayerList.appendChild(li);
        });
    }

    await updateTaxPayerList();
});
