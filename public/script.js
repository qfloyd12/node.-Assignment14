document.addEventListener('DOMContentLoaded', () => {
    // Open add craft dialog
    document.getElementById('add-link').addEventListener('click', () => {
        setupAddCraftDialog();
    });

    // Fetch and display crafts from server
    fetchCrafts();

    // Add supply input field
    document.getElementById('add-supply').addEventListener('click', () => addSupplyField());

    // Show image preview when selected
    document.getElementById('img').addEventListener('change', displayImagePreview);

    // Handle form submission for adding or editing a craft
    document.getElementById('add-craft-form').addEventListener('submit', handleSubmitCraftForm);

    // Close modal on cancel
    document.querySelector('.action-buttons button[type="button"]').addEventListener('click', closeModal);
});

function fetchCrafts() {
    fetch('/api/crafts')
        .then(response => response.json())
        .then(crafts => displayCrafts(crafts))
        .catch(error => console.error('Error fetching crafts:', error));
}

function displayCrafts(crafts) {
    const gallery = document.getElementById('crafts-gallery');
    gallery.innerHTML = ''; // Clear existing crafts before displaying new ones
    crafts.forEach(craft => {
        const html = `
            <div class="w3-quarter" data-name="${craft.name}">
                <img src="${craft.img}" alt="${craft.name}" style="width:100%;cursor:pointer;" onclick="showDetails('${craft.name}', '${craft.description}', '${craft.supplies.join(', ')}', '${craft.img}')" class="w3-hover-opacity">
            </div>
        `;
        gallery.innerHTML += html;
    });
}

function setupAddCraftDialog() {
    document.getElementById('form-mode').value = 'add';
    document.getElementById('original-name').value = '';
    document.getElementById('add-craft-dialog').style.display = 'block';
}

function showDetails(name, description, supplies, imgSrc) {
    // Show craft details in a modal dialog
    // This function should remain the same as you provided, showing craft details with options to edit or delete
}

function handleSubmitCraftForm(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('supplies', JSON.stringify([...document.querySelectorAll('#supply-section input[type="text"]')].map(input => input.value)));
    formData.append('img', document.getElementById('img').files[0]);

    const formMode = document.getElementById('form-mode').value;
    const endpoint = formMode === 'edit' ? '/api/edit-craft' : '/api/add-craft';

    fetch(endpoint, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
    .then(() => {
        closeModal();
        clearFormData();
        fetchCrafts(); // Refresh the crafts display
    })
    .catch(error => console.error('Error:', error));
}

function deleteCraft(name) {
    fetch(`/api/delete-craft/${name}`, { method: 'DELETE' })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(() => {
            fetchCrafts(); // Refresh the crafts display
        })
        .catch(error => console.error('Error deleting craft:', error));

    document.getElementById('craftDetailsModal').remove();
}

function addSupplyField(value = '') {
    const supplySection = document.getElementById('supply-section');
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('name', 'supplies');
    newInput.value = value;
    supplySection.appendChild(newInput);
}

function displayImagePreview(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            const imgPreview = document.getElementById('img-preview');
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function clearFormData() {
    document.getElementById('add-craft-form').reset();
    document.getElementById('img-preview').style.display = 'none';
    clearAdditionalSupplyFields();
}

function clearAdditionalSupplyFields() {
    const supplySection = document.getElementById('supply-section');
    const additionalInputs = supplySection.querySelectorAll('input[name="supplies"]:not(:first-of-type)');
    additionalInputs.forEach(input => input.remove());
}

function closeModal() {
    const modal = document.getElementById('add-craft-dialog');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        clearFormData();
    }
}

window.onclick = function(event) {
    if (event.target === document.getElementById('add-craft-dialog')) {
        closeModal();
    }
};
