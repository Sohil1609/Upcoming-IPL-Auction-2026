document.addEventListener('DOMContentLoaded', function() {
    // Get all page links
    const pageLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Set active page
    function setActivePage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        
        // Update active nav link
        pageLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
                // Set the color based on page
                if (pageId === 'home') link.style.color = '#8b5cf6';
                else if (pageId === 'players') link.style.color = '#3b82f6';
                else if (pageId === 'teams') link.style.color = '#10b981';
                else if (pageId === 'auction') link.style.color = '#ef4444';
                          else if (pageId === 'stats') link.style.color = '#f59e0b';
            } else {
                link.classList.remove('active');
                link.style.color = '';
            }
        });
    }
    
    // Add click event to all page links
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            setActivePage(pageId);
            
            // Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Login modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    
    loginBtn.addEventListener('click', function() {
        loginModal.classList.remove('hidden');
    });
    
    closeModal.addEventListener('click', function() {
        loginModal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
        }
    });
    
    // Countdown timer for auction
    function updateCountdown() {
        // Set the date we're counting down to (Dec 18, 2025)
        const countDownDate = new Date("Dec 18, 2025 10:00:00").getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("auctionTimer").innerHTML = 
            (days > 0 ? days + "d " : "") + 
            (hours > 0 ? hours + "h " : "") + 
            minutes + "m " + seconds + "s";
        
        // If the count down is finished, write some text
        if (distance < 0) {
            document.getElementById("auctionTimer").innerHTML = "Auction Started!";
        }
    }
    
    // Player timer
    let playerTime = 30;
    function updatePlayerTimer() {
        document.getElementById("playerTimer").innerHTML = playerTime + "s";
        if (playerTime <= 5) {
            document.getElementById("playerTimer").classList.add('timer-flash');
        } else {
            document.getElementById("playerTimer").classList.remove('timer-flash');
        }
        
        if (playerTime <= 0) {
            playerTime = 30; // Reset timer
            // Simulate next player
            simulateNextPlayer();
        } else {
            playerTime--;
        }
    }
    
    // Simulate bidding on next player
    function simulateNextPlayer() {
        const currentBidElement = document.getElementById('currentBid');
        let currentBid = parseFloat(currentBidElement.textContent.replace('₹', '').replace(' Cr', ''));
        
        // Random bid increment between 0.25 and 0.5 Cr
        const increment = 0.25 + Math.random() * 0.25;
        const newBid = currentBid + increment;
        
        // Update current bid
        currentBidElement.textContent = '₹' + newBid.toFixed(2) + ' Cr';
        
        // Update progress bar
        const progressPercent = (newBid / 16.25) * 100; // 16.25 is max expected bid
        document.querySelector('.progress-bar').style.width = Math.min(progressPercent, 100) + '%';
        
        // Randomly change leading team
        const teams = ['MI', 'CSK', 'RCB', 'KKR', 'DC', 'AH', 'KL'];
        const randomTeam = teams[Math.floor(Math.random() * teams.length)];
        document.querySelector('.bg-gray-100.rounded-lg.p-4 div.flex.items-center img').src = 
            `https://www.iplt20.com/assets/images/team_logs/${randomTeam}.png`;
        document.querySelector('.bg-gray-100.rounded-lg.p-4 div.flex.items-center span').textContent = 
            randomTeam === 'MI' ? 'Mumbai Indians' :
            randomTeam === 'CSK' ? 'Chennai Super Kings' :
            randomTeam === 'RCB' ? 'Royal Challengers' :
            randomTeam === 'KKR' ? 'Kolkata Knight Riders' :
            randomTeam === 'DC' ? 'Delhi Capitals' :
            randomTeam === 'IH' ? 'Indore Heroes' :
            randomTeam === 'PL' ? 'Patna Lions':
    }
    
    // Initialize timers
    updateCountdown();
    updatePlayerTimer();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    setInterval(updatePlayerTimer, 1000);
    
    // Filter chips functionality
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            filterChips.forEach(c => c.classList.remove('active', 'bg-blue-100', 'text-blue-800'));
            this.classList.add('active', 'bg-blue-100', 'text-blue-800');
        });
    });
});