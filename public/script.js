async function getCrafts() {
    try {
        const response = await fetch("/api/crafts");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("error retrieving crafts data", error);
        return [];
    }
}

async function showCrafts() {
    const craftsJSON = await getCrafts();
    const craftsDiv = document.getElementById("crafts-gallery");

    if (craftsJSON.length === 0) {
        craftsDiv.innerHTML = "<p>Sorry, no crafts available at the moment.</p>";
        return;
    }

    craftsJSON.forEach((craft) => {
        const card = document.createElement("div");
        card.className = 'w3-card';

        const image = document.createElement("img");
        image.src = craft.img;
        image.alt = craft.name;
        image.style.width = '100%';
        card.appendChild(image);

        const container = document.createElement("div");
        container.className = 'w3-container';

        const h3 = document.createElement("h3");
        h3.textContent = craft.name;
        container.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = craft.description;
        container.appendChild(p);

        card.appendChild(container);

        craftsDiv.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', showCrafts);
