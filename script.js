// Enhanced Kanye quotes database with eras
const kanyeQuotes = [
    { quote: "For me, giving up is way harder than trying.", source: "Interview", era: "interview" },
    { quote: "We're all self-conscious, I'm just the first to admit it.", source: "All Falls Down", era: "college" },
    { quote: "Everything I'm not made me everything I am.", source: "Stronger", era: "graduation" },
    { quote: "Reach for the stars so if you fall, you land on a cloud.", source: "Good Night", era: "graduation" },
    { quote: "My greatest pain in life is that I will never be able to see myself perform live.", source: "Interview", era: "interview" },
    { quote: "Believe in your flyness, conquer your shyness.", source: "Stronger", era: "graduation" },
    { quote: "They say people in your life are seasons, and anything that happens is for a reason.", source: "Big Brother", era: "graduation" },
    { quote: "You don't have the answers, Sway!", source: "Interview", era: "interview" },
    { quote: "I miss the old Kanye, straight from the 'Go Kanye'.", source: "I Love Kanye", era: "all" },
    { quote: "To use is necessary, to abuse is unnecessary.", source: "Interview", era: "interview" },
    { quote: "No one man should have all that power.", source: "Power", era: "all" },
    { quote: "Let's have a toast for the douchebags.", source: "Runaway", era: "all" },
    { quote: "Name one genius that ain't crazy.", source: "Feedback", era: "yeezus" },
    { quote: "I'm living in the future so the present is my past.", source: "Monster", era: "all" },
    { quote: "I'm doing pretty good as far as geniuses go.", source: "Interview", era: "interview" },
    { quote: "I'm the number one living and breathing rock star.", source: "Interview", era: "interview" },
    { quote: "I feel like I'm too busy writing history to read it.", source: "Interview", era: "interview" },
    { quote: "I'm a creative genius and there's no other way to word it.", source: "Interview", era: "interview" },
    { quote: "I will go down as the voice of this generation, of this decade, I will be the loudest voice.", source: "Interview", era: "interview" },
    { quote: "I'm not a celebrity, I'm an activist.", source: "Interview", era: "interview" },
    { quote: "I'm a minimalist in a rapper's body.", source: "Interview", era: "interview" },
    { quote: "I think I do myself a disservice by comparing myself to Steve Jobs and Walt Disney and human beings that we've seen before.", source: "Interview", era: "interview" },
    { quote: "I'm the head of Adidas. I will bring the coolness to Adidas.", source: "Interview", era: "interview" },
    { quote: "I am Warhol. I am the number one most impactful artist of our generation.", source: "Interview", era: "interview" },
    { quote: "I am Shakespeare in the flesh.", source: "Interview", era: "interview" },
    { quote: "I'm the nucleus. I'm the center of the universe.", source: "Interview", era: "interview" },
    { quote: "I'm a trained fine artist. I went to art school from the time I was 5 years old.", source: "Interview", era: "interview" },
    { quote: "I'm a pop enigma. I live and breathe every element in life.", source: "Interview", era: "interview" },
    { quote: "I'm a product of Rakim, Ice Cube, Eazy-E, and Too $hort.", source: "Interview", era: "interview" },
    { quote: "I'm the best of all time. It's not even a question.", source: "Interview", era: "interview" },
    { quote: "I'm the most influential artist of the 21st century.", source: "Interview", era: "interview" },
    { quote: "I'm not a rapper, I'm a cultural reset.", source: "Interview", era: "interview" },
    { quote: "I'm the greatest human artist of all time.", source: "Interview", era: "interview" },
    { quote: "I'm the most impactful person in music, period.", source: "Interview", era: "interview" },
    { quote: "I'm the Kanye West of Kanye West of Kanye West.", source: "Interview", era: "interview" },
    { quote: "I'm a human being. I'm a real boy. I'm not a concept.", source: "Interview", era: "interview" },
    { quote: "I'm the new Jesus. I'm the new Steve Jobs.", source: "Interview", era: "interview" },
    { quote: "I'm the most interesting person in the world.", source: "Interview", era: "interview" },
    { quote: "I'm the king. I'm the king of rap, rock, and roll.", source: "Interview", era: "interview" },
    { quote: "I'm the most important person in the culture.", source: "Interview", era: "interview" },
    { quote: "I'm the voice of this generation. The voice of this generation.", source: "Interview", era: "interview" },
    { quote: "I'm the most powerful voice in music.", source: "Interview", era: "interview" },
    { quote: "I'm the greatest rock star on the planet.", source: "Interview", era: "interview" },
    { quote: "I'm the most influential person in the world.", source: "Interview", era: "interview" },
    { quote: "I'm the most important artist of our time.", source: "Interview", era: "interview" },
    { quote: "I'm the most important person in the world.", source: "Interview", era: "interview" },
    { quote: "I'm the most important person in the history of the world.", source: "Interview", era: "interview" }
];

// DOM elements
const quoteText = document.getElementById('quoteText');
const quoteMeta = document.getElementById('quoteMeta');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const notification = document.getElementById('notification');
const quoteCount = document.getElementById('quoteCount');
const wisdomPoints = document.getElementById('wisdomPoints');
const eraBtns = document.querySelectorAll('.era-btn');
const quoteCard = document.querySelector('.quote-card');

// Variables
let count = 0;
let currentEra = 'all';
let wisdom = 0;

// Set initial quote count from localStorage
if (localStorage.getItem('quoteCount')) {
    count = parseInt(localStorage.getItem('quoteCount'));
    quoteCount.textContent = count;
    wisdom = Math.floor(count * 1.5);
    wisdomPoints.textContent = wisdom;
}

// Era selector event listeners
eraBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        eraBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentEra = btn.dataset.era;
        displayNewQuote();
    });
});

// Get a random quote filtered by era
function getRandomQuote() {
    let filteredQuotes = kanyeQuotes;
    if (currentEra !== 'all') {
        filteredQuotes = kanyeQuotes.filter(quote => quote.era === currentEra || quote.era === 'all');
    }
    
    if (filteredQuotes.length === 0) {
        return {
            quote: "I haven't said anything profound in this era yet. Try another one. Or don't. I don't care.",
            source: "Kanye (probably)",
            era: "all"
        };
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
}

// Display a new quote with animation
function displayNewQuote() {
    // Add loading class
    quoteText.classList.add('loading');
    
    // Remove pulse animation
    quoteCard.classList.remove('pulse');
    
    // Get new quote after a short delay to simulate loading
    setTimeout(() => {
        const newQuote = getRandomQuote();
        
        // Update text
        quoteText.textContent = `"${newQuote.quote}"`;
        quoteMeta.textContent = `— ${newQuote.source}`;
        
        // Remove loading class and add fade-in effect
        quoteText.classList.remove('loading');
        quoteText.classList.remove('fade-in');
        void quoteText.offsetWidth; // Trigger reflow
        quoteText.classList.add('fade-in');
        
        // Add pulse animation back
        setTimeout(() => {
            quoteCard.classList.add('pulse');
        }, 800);
        
        // Update counter
        count++;
        quoteCount.textContent = count;
        wisdom = Math.floor(count * 1.5);
        wisdomPoints.textContent = wisdom;
        localStorage.setItem('quoteCount', count);
        
        // Trigger random pop effect on a random Kanye image
        triggerRandomPop();
    }, 300);
}

// Trigger random pop effect on a random Kanye image
function triggerRandomPop() {
    const kanyes = document.querySelectorAll('.floating-kanye');
    const randomKanye = kanyes[Math.floor(Math.random() * kanyes.length)];
    
    // Add a temporary class for an extra pop effect
    randomKanye.style.animation = 'none';
    setTimeout(() => {
        randomKanye.style.animation = '';
    }, 10);
    
    // Create a temporary glow effect
    const originalFilter = randomKanye.style.filter;
    randomKanye.style.filter = 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.9))';
    setTimeout(() => {
        randomKanye.style.filter = originalFilter;
    }, 500);
}

// Copy quote to clipboard
function copyToClipboard() {
    const textToCopy = `${quoteText.textContent} ${quoteMeta.textContent}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Show notification
        notification.textContent = getRandomCopyMessage();
        notification.classList.add('show');
        
        // Hide notification after 2 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        notification.textContent = "Failed to copy quote. Even Kanye is disappointed in your tech skills.";
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
}

// Get random sarcastic copy message
function getRandomCopyMessage() {
    const messages = [
        "Quote copied to clipboard! You're welcome.",
        "Wisdom successfully copied. Use it wisely. Or don't.",
        "Kanye's genius is now in your clipboard. Don't misuse it.",
        "You now possess Yeezy wisdom. Handle with care.",
        "Quote copied. You're one step closer to enlightenment. Maybe.",
        "Kanye's words are now yours. Don't embarrass him.",
        "Genius transferred to clipboard. Use responsibly.",
        "You've captured pure genius. Don't screw this up."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Tweet quote
function tweetQuote() {
    const textToTweet = `${quoteText.textContent} ${quoteMeta.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToTweet)}&hashtags=KanyeWisdom`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
generateBtn.addEventListener('click', displayNewQuote);
copyBtn.addEventListener('click', copyToClipboard);
tweetBtn.addEventListener('click', tweetQuote);

// Initialize with a random quote
displayNewQuote();

// Add random pops to Kanye images periodically
setInterval(triggerRandomPop, 3000);