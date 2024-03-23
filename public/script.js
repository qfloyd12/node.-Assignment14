document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/crafts')
        .then(response => response.json())
        .then(crafts => {
            const gallery = document.getElementById('crafts-gallery');
            crafts.forEach(craft => {
                const html = `
                    <div class="w3-quarter">
                        <img src="${craft.img}" alt="${craft.name}" style="width:100%;cursor:pointer;" class="w3-hover-opacity" onclick="openModal('${craft.name.replace(/'/g, "\\'")}', '${craft.description.replace(/'/g, "\\'")}', '${craft.supplies.join(', ').replace(/'/g, "\\'")}', '${craft.img}')">
                    </div>
                `;
                gallery.innerHTML += html;
            });
        })
        .catch(error => console.error('Error fetching crafts:', error));
});

function openModal(name, description, supplies, imgSrc) {
    closeModal(); 
    const modalHTML = `
        <div id="craftModal" class="modal" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation();">
                <span class="close" onclick="closeModal()">&times;</span>
                <img src="${imgSrc}" alt="${name}" style="width:100%">
                <div class="modal-info">
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
    const modal = document.getElementById('craftModal');
    if (modal) {
        modal.remove();
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('craftModal');
    if (event.target === modal) {
        closeModal();
    }
};

