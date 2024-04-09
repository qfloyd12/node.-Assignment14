document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('add-link').addEventListener('click', () => {
        document.getElementById('form-mode').value = 'add'; 
        document.getElementById('original-name').value = ''; 
        document.getElementById('add-craft-dialog').style.display = 'block';
    });

 
    fetch('/api/crafts')
        .then(response => response.json())
        .then(crafts => {
            const gallery = document.getElementById('crafts-gallery');
            crafts.forEach(craft => {
                const html = `
                    <div class="w3-quarter" data-name="${craft.name}">
                        <img src="${craft.img}" alt="${craft.name}" style="width:100%;cursor:pointer;" onclick="showDetails('${craft.name}', '${craft.description}', '${craft.supplies.join(', ')}', '${craft.img}')" class="w3-hover-opacity">
                    </div>
                `;
                gallery.innerHTML += html;
            });
        })
        .catch(error => console.error('Error fetching crafts:', error));

    document.getElementById('add-supply').addEventListener('click', () => addSupplyField());


    document.getElementById('img').addEventListener('change', displayImagePreview);

    
    document.getElementById('add-craft-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const mode = document.getElementById('form-mode').value;
        const originalName = document.getElementById('original-name').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const supplies = Array.from(document.querySelectorAll('#supply-section input[type="text"]'))
                              .map(input => input.value).join(', ');
        const imgPreview = document.getElementById('img-preview');
        const imgPreviewSrc = imgPreview.src;

        const gallery = document.getElementById('crafts-gallery');
        if (mode === 'edit') {
            const craftElement = gallery.querySelector(`div[data-name='${originalName}']`);
            if (craftElement) {
                craftElement.setAttribute('data-name', name);
                const img = craftElement.querySelector('img');
                img.src = imgPreviewSrc;
                img.alt = name;
                img.setAttribute('onclick', `showDetails('${name}', '${description}', '${supplies}', '${imgPreviewSrc}')`);
            }
        } else {
            gallery.innerHTML += `
                <div class="w3-quarter" data-name="${name}">
                    <img src="${imgPreviewSrc}" alt="${name}" style="width:100%;cursor:pointer;" 
                         class="w3-hover-opacity" 
                         onclick="showDetails('${name}', '${description}', '${supplies}', '${imgPreviewSrc}')"
                         data-name="${name}" data-description="${description}" data-supplies="${supplies}" 
                         data-img="${imgPreviewSrc}">
                </div>
            `;
        }

        closeModal();
        clearFormData();
    });

   
    document.querySelector('.action-buttons button[type="button"]').addEventListener('click', closeModal);
});


function showDetails(name, description, supplies, imgSrc) {
    document.body.insertAdjacentHTML('beforeend', `
        <div id="craftDetailsModal" class="w3-modal" style="display:block">
            <div class="w3-modal-content">
                <header class="w3-container w3-teal"> 
                    <span onclick="document.getElementById('craftDetailsModal').remove()"
                    class="w3-button w3-display-topright">&times;</span>
                    <h2>${name}</h2>
                </header>
                <div class="w3-container">
                    <p>${description}</p>
                    <p><strong>Supplies:</strong> ${supplies}</p>
                    <img src="${imgSrc}" alt="${name}" style="width:100%">
                </div>
                <footer class="w3-container w3-teal">
                    <button onclick="editCraft('${name}', '${description}', '${supplies}', '${imgSrc}')">Edit</button>
                    <button onclick="deleteCraft('${name}')">Delete</button>
                </footer>
            </div>
        </div>
    `);
}


function editCraft(name, description, supplies, imgSrc) {
    
    document.getElementById('form-mode').value = 'edit';
    document.getElementById('original-name').value = name;

    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    clearAdditionalSupplyFields();
    const suppliesArray = supplies.split(', ');
    document.getElementById('supplies').value = suppliesArray.shift();
    suppliesArray.forEach(supply => addSupplyField(supply));
    const imgPreview = document.getElementById('img-preview');
    imgPreview.src = imgSrc;
    imgPreview.style.display = 'block';
    document.getElementById('add-craft-dialog').style.display = 'block';
    document.getElementById('craftDetailsModal').remove();
}


function deleteCraft(name) {
    const gallery = document.getElementById('crafts-gallery');
    const craftElement = gallery.querySelector(`div[data-name='${name}']`);
    if (craftElement) {
        gallery.removeChild(craftElement);
    }
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
        reader.onload = function(e) {
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
