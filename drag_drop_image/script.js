const imageItems = document.querySelectorAll('.image-item');

imageItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
    item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    const img = e.target.closest('.image-item').querySelector('img');
    if (img) {
        e.dataTransfer.setData('text/plain', img.id);
        setTimeout(() => {
            e.target.closest('.image-item').classList.add('dragging');
        }, 0);
    }
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedImageId = e.dataTransfer.getData('text');
    const draggedImage = document.getElementById(draggedImageId);
    const dropTarget = e.target.closest('.image-item').querySelector('img');

    if (draggedImage && dropTarget && draggedImage !== dropTarget) {
        const tempSrc = draggedImage.src;
        const tempAlt = draggedImage.alt;

        draggedImage.src = dropTarget.src;
        draggedImage.alt = dropTarget.alt;

        dropTarget.src = tempSrc;
        dropTarget.alt = tempAlt;
    }
}

function dragEnd(e) {
    e.target.closest('.image-item').classList.remove('dragging');
}