// Countdown Timer to April 1, 2025 11:59:59 PM EST
function updateCountdown() {
    // Set the target date: April 1, 2025 at 11:59:59 PM EST
    const endDate = new Date('April 1, 2025 23:59:59 GMT-0500');
    
    // Get current time
    const now = new Date().getTime();
    
    // Find the distance between now and the countdown date
    const distance = endDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the HTML
    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    
    // If the countdown is over, show the April Fools reveal
    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        
        // Show April Fools modal
        showAprilFoolsReveal();
        
        // Clear the countdown interval
        clearInterval(countdownInterval);
    }
}

// Initialize and update the countdown every second
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// Connect Wallet button functionality
document.querySelector('.connect-wallet').addEventListener('click', function() {
    alert('Metamask integration coming soon! 🤔');
});

// Presale button functionality
document.querySelector('.presale-btn').addEventListener('click', function() {
    alert('Pre-registration is only available to team members! 🚀');
});

// Live price chart
function initPriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // Generate initial data points (last 24 hours with 1 hour intervals)
    const labels = Array.from({ length: 24 }, (_, i) => {
        const d = new Date();
        d.setHours(d.getHours() - 23 + i);
        return d.getHours() + ':00';
    });
    
    // Generate price data with a baseline of $1.15 and some volatility
    let basePrice = 1.15;
    const priceData = labels.map((_, i) => {
        // Slightly upward trend with random fluctuations
        basePrice = basePrice * (1 + Math.random() * 0.03 - 0.015);
        return parseFloat(basePrice.toFixed(2));
    });
    
    // Create the chart
    const priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Price (USD)',
                    data: priceData,
                    borderColor: '#F4910D',
                    backgroundColor: 'rgba(244, 145, 13, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: value => '$' + value
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: context => '$' + context.parsed.y
                    }
                }
            }
        }
    });
    
    // Function to update chart with new data
    function updateChart() {
        // Remove first data point and add new one
        priceChart.data.labels.shift();
        const now = new Date();
        priceChart.data.labels.push(now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0'));
        
        // Update price with random fluctuation
        const lastPrice = priceChart.data.datasets[0].data[priceChart.data.datasets[0].data.length - 1];
        const change = Math.random() * 0.03 - 0.015; // Random change between -1.5% and +1.5%
        const newPrice = lastPrice * (1 + change);
        
        priceChart.data.datasets[0].data.shift();
        priceChart.data.datasets[0].data.push(parseFloat(newPrice.toFixed(2)));
        
        // Update the current price display
        const currentPriceEl = document.getElementById('current-price');
        currentPriceEl.innerText = '$' + newPrice.toFixed(2);
        
        // Update the price change percentage
        const priceChangeEl = document.getElementById('price-change');
        const percentChange = ((newPrice / 1.15) - 1) * 100;
        priceChangeEl.innerText = (percentChange >= 0 ? '+' : '') + percentChange.toFixed(1) + '%';
        
        if (percentChange >= 0) {
            priceChangeEl.classList.remove('negative');
            priceChangeEl.classList.add('positive');
        } else {
            priceChangeEl.classList.remove('positive');
            priceChangeEl.classList.add('negative');
        }
        
        // Update other stats
        const marketCapEl = document.getElementById('market-cap');
        const marketCap = (newPrice * 420690000).toFixed(0);
        marketCapEl.innerText = '$' + formatNumber(marketCap);
        
        const volumeEl = document.getElementById('volume');
        const volume = Math.floor(25000000 + Math.random() * 10000000);
        volumeEl.innerText = '$' + formatNumber(volume);
        
        // Sometimes update holders count
        if (Math.random() > 0.7) {
            const holdersEl = document.getElementById('holders');
            const currentHolders = parseInt(holdersEl.innerText.replace(/,/g, ''));
            const newHolders = currentHolders + Math.floor(Math.random() * 10);
            holdersEl.innerText = formatNumber(newHolders);
        }
        
        priceChart.update();
    }
    
    // Update chart every 5 seconds
    setInterval(updateChart, 5000);
}

// Initialize tokenomics chart
function initTokenomicsChart() {
    const ctx = document.getElementById('tokenomicsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Community', 'Liquidity', 'Team', 'Marketing', 'Partnerships'],
            datasets: [
                {
                    data: [40, 25, 15, 10, 10],
                    backgroundColor: [
                        '#F69B18',  // Gamboge
                        '#F4910D',  // Carrot Orange
                        '#FFCC4D',  // Sunglow
                        '#F4900C',  // Carrot Orange 2
                        '#664500'   // Field Drab
                    ],
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: context => context.label + ': ' + context.parsed + '%'
                    }
                }
            }
        }
    });
}

// Helper function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Close notification banner
document.querySelector('.close-notification').addEventListener('click', function() {
    document.querySelector('.notification-banner').style.display = 'none';
});

// Random visitor count (increases periodically)
function updateVisitorCount() {
    const visitorElement = document.getElementById('fake-visitors');
    let currentCount = parseInt(visitorElement.innerText);
    
    // Randomly increase by 1-5 visitors
    const increase = Math.floor(Math.random() * 5) + 1;
    currentCount += increase;
    
    visitorElement.innerText = currentCount;
    
    // Update every 3-8 seconds
    setTimeout(updateVisitorCount, Math.random() * 5000 + 3000);
}

// Initialize visitor count updates
updateVisitorCount();

// Buy button pulse effect
document.querySelector('.buy-button').addEventListener('click', function() {
    alert('Sale is not live yet! Join our waitlist by connecting your wallet.');
});

// April Fools Reveal
function showAprilFoolsReveal() {
    // Show the reveal overlay
    document.querySelector('.april-fools-reveal').classList.add('show');
    
    // Add event listener to close button if not already added
    if (!document.querySelector('.close-reveal').hasAttribute('data-listener')) {
        document.querySelector('.close-reveal').addEventListener('click', function() {
            document.querySelector('.april-fools-reveal').classList.remove('show');
        });
        document.querySelector('.close-reveal').setAttribute('data-listener', 'true');
    }
}

// Check if it's April 1, 2025
function checkForAprilFirst() {
    const today = new Date();
    const aprilFirst2025 = new Date('April 1, 2025');
    
    // Set both dates to midnight for proper comparison
    today.setHours(0, 0, 0, 0);
    aprilFirst2025.setHours(0, 0, 0, 0);
    
    // Only check if the countdown has ended
    if (today.getTime() === aprilFirst2025.getTime()) {
        // Check if we're past the end time (11:59:59 PM EST)
        const now = new Date();
        const endTime = new Date('April 1, 2025 23:59:59 GMT-0500');
        
        if (now >= endTime) {
            showAprilFoolsReveal();
        }
    }
}

// Add a secret trigger for testing (Konami code: up, up, down, down, left, right, left, right, B, A)
let konamiIndex = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showAprilFoolsReveal();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Initialize charts and check date when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPriceChart();
    initTokenomicsChart();
    checkForAprilFirst();
});