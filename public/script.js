document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-link').addEventListener('click', () => {
        document.getElementById('add-craft-dialog').style.display = 'block';
    });

    fetch('/api/crafts')
        .then(response => response.json())
        .then(crafts => {
            const gallery = document.getElementById('crafts-gallery');
            crafts.forEach(craft => {
                const html = `
                    <div class="w3-quarter">
                        <img src="${craft.img}" alt="${craft.name}" style="width:100%;cursor:pointer;" class="w3-hover-opacity craft-image" data-name="${craft.name}" data-description="${craft.description}" data-supplies="${craft.supplies.join(', ')}" data-img="${craft.img}">
                    </div>
                `;
                gallery.innerHTML += html;
            });
            attachImageEventListeners();
        })
        .catch(error => console.error('Error fetching crafts:', error));

    document.getElementById('add-supply').addEventListener('click', addSupplyField);
    document.getElementById('img').addEventListener('change', displayImagePreview);

    document.getElementById('add-craft-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const supplies = Array.from(document.querySelectorAll('#supply-section input[type="text"]'))
            .map(input => input.value).join(', ');
        const imgPreviewSrc = document.getElementById('img-preview').src;
        const gallery = document.getElementById('crafts-gallery');
        const html = `
            <div class="w3-quarter">
                <img src="${imgPreviewSrc}" alt="${name}" style="width:100%;cursor:pointer;" class="w3-hover-opacity craft-image" data-name="${name}" data-description="${description}" data-supplies="${supplies}" data-img="${imgPreviewSrc}">
            </div>
        `;
        gallery.innerHTML += html;
        attachImageEventListeners();
        closeModal();
        clearFormData();
    });

    document.querySelectorAll('.action-buttons button')[0].addEventListener('click', () => {
        closeModal();
        clearFormData();
    });
});

function attachImageEventListeners() {
    document.querySelectorAll('.craft-image').forEach(image => {
        image.removeEventListener('click', openCraftModal);
        image.addEventListener('click', openCraftModal);
    });
}

function openCraftModal(event) {
    const target = event.currentTarget;
    const name = target.getAttribute('data-name');
    const description = target.getAttribute('data-description');
    const supplies = target.getAttribute('data-supplies');
    const imgSrc = target.getAttribute('data-img');
    openModal(name, description, supplies, imgSrc);
}

function openModal(name, description, supplies, imgSrc) {
    const modalHTML = `
        <div id="craftModal" class="w3-modal" onclick="closeModal()">
            <div class="w3-modal-content">
                <span onclick="closeModal()" class="w3-button w3-display-topright">&times;</span>
                <img src="${imgSrc}" alt="${name}" style="width:100%">
                <div class="w3-container">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <h3>Supplies:</h3>
                    <p>${supplies}</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('craftModal').style.display = 'block';
}

function closeModal() {
    const addCraftModal = document.getElementById('add-craft-dialog');
    const dynamicModal = document.getElementById('craftModal');
    if (addCraftModal) {
        addCraftModal.style.display = 'none';
    }
    if (dynamicModal) {
        dynamicModal.remove();
    }
}

function addSupplyField() {
    const supplySection = document.getElementById('supply-section');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'supplies';
    supplySection.appendChild(newInput);
}

function displayImagePreview(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgPreview = document.getElementById('img-preview');
            imgPreview.src = e.target.result;
            imgPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function clearFormData() {
    const form = document.getElementById('add-craft-form');
    form.reset();
    const imgPreview = document.getElementById('img-preview');
    imgPreview.src = '';
    imgPreview.style.display = 'none';
    const additionalSupplies = document.querySelectorAll('#supply-section input[type="text"]:not(:first-child)');
    additionalSupplies.forEach(input => input.remove());
}

window.onclick = function(event) {
    const addCraftModal = document.getElementById('add-craft-dialog');
    const dynamicModal = document.getElementById('craftModal');
    if (addCraftModal && event.target === addCraftModal) {
        closeModal();
    }
    if (dynamicModal && event.target === dynamicModal) {
        dynamicModal.remove();
    }
};