const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');

// Set initial position to center with the yes button
noButton.style.position = 'relative';

// Function to handle mouse hover on the No button
noButton.addEventListener('mouseover', () => {
    const maxDistance = 300; // Increased maximum distance
    
    // Generate random offset between -maxDistance and +maxDistance
    const randomX = Math.floor((Math.random() - 0.5) * maxDistance * 2);
    const randomY = Math.floor((Math.random() - 0.5) * maxDistance * 2);
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    // Add some randomness to the movement pattern
    const movePattern = Math.random();
    let newX, newY;
    
    if (movePattern < 0.5) {
        // Move opposite to the cursor's direction
        const buttonRect = noButton.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonWidth / 2;
        const buttonCenterY = buttonRect.top + buttonHeight / 2;
        
        // Get cursor position from the event
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        
        // Move away from cursor
        const deltaX = buttonCenterX - cursorX;
        const deltaY = buttonCenterY - cursorY;
        
        newX = buttonCenterX + (deltaX * 2);
        newY = buttonCenterY + (deltaY * 2);
    } else {
        // Random position
        newX = Math.random() * (viewportWidth - buttonWidth);
        newY = Math.random() * (viewportHeight - buttonHeight);
    }
    
    // Keep button within viewport bounds with padding
    const padding = 50;
    newX = Math.min(Math.max(padding, newX), viewportWidth - buttonWidth - padding);
    newY = Math.min(Math.max(padding, newY), viewportHeight - buttonHeight - padding);
    
    // Apply new position with animation
    noButton.style.position = 'fixed';
    noButton.style.left = newX + 'px';
    noButton.style.top = newY + 'px';
});

// Add mousemove listener to make button more reactive
document.addEventListener('mousemove', (event) => {
    const buttonRect = noButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Calculate distance between mouse and button
    const deltaX = mouseX - (buttonRect.left + buttonRect.width / 2);
    const deltaY = mouseY - (buttonRect.top + buttonRect.height / 2);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // If mouse gets too close (within 100px), trigger movement
    if (distance < 100) {
        noButton.dispatchEvent(new Event('mouseover'));
    }
});

// Handle No button click
noButton.addEventListener('click', () => {
    // Transform the button into a Yes button
    noButton.style.backgroundColor = '#4CAF50';
    noButton.textContent = 'Yes';
    noButton.style.position = 'relative';
    noButton.style.left = '0';
    noButton.style.top = '0';
    
    // Remove the mouseover event
    noButton.removeEventListener('mouseover', noButton.mouseover);
    
    // Add the yes button click behavior
    noButton.addEventListener('click', showSuccessMessage);
});

// Function to show success message
function showSuccessMessage() {
    // Remove the buttons
    document.querySelector('.buttons').style.display = 'none';
    
    // Create and show the success message
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'AYYYYYY!';
    document.querySelector('.container').appendChild(message);
    
    // Add restart button
    const restartButton = document.createElement('button');
    restartButton.className = 'restart-button';
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => {
        window.location.reload();
    });
    document.body.appendChild(restartButton);
}

// Handle Yes button click
yesButton.addEventListener('click', showSuccessMessage);

// Add at the beginning of the file
function createDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots-background';
    document.body.appendChild(dotsContainer);

    // Create 50 dots
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random starting position
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * -20;
        dot.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        dotsContainer.appendChild(dot);
    }
}

// Call this when the page loads
createDots(); 