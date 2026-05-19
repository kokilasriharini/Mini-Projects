# Responsive Landing Page Report

## Overview
This project was built using semantic HTML, CSS Flexbox, CSS Grid, and responsive design techniques.

## Design Decisions
- Flexbox was used for header and hero layouts.
- CSS Grid was used for service cards.
- Media queries were used for mobile responsiveness.
- A responsive hamburger menu was implemented using JavaScript DOM manipulation.

## Challenges Faced
One challenge was implementing the mobile navigation menu and making it responsive across smaller screen sizes.

## Solution
JavaScript class toggling and CSS media queries were used to create a responsive navigation system.

## Technologies Used
- HTML5
- CSS3
- JavaScript

## index.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Landing Page</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>

    <!-- Header -->

    <header class="header">
        <div class="container">
            <h1 class="logo">Brand</h1>
           <button class="menu-btn" id="menuBtn">
        ☰
    </button>
            <nav class="navbar" id="navbar">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->

    <section class="hero">
        <div class="container hero-content">
            <div class="hero-text">
                <h2>Build Modern Websites</h2>
                <p>
                    Responsive web pages using semantic HTML and modern CSS layouts.
                </p>

                <button class="btn">Get Started</button>
            </div>

            <div class="hero-image">
                <img src="https://picsum.photos/500/350" alt="Hero Image">
            </div>
        </div>
    </section>

    <!-- Cards Section -->

    <section class="services">
        <div class="container">

            <h2 class="section-title">Our Services</h2>

            <div class="cards">

                <div class="card">
                    <h3>Web Design</h3>
                    <p>Create modern and clean user interfaces.</p>
                </div>

                <div class="card">
                    <h3>Frontend Development</h3>
                    <p>Responsive layouts with HTML and CSS.</p>
                </div>

                <div class="card">
                    <h3>Responsive Design</h3>
                    <p>Mobile-friendly web experiences.</p>
                </div>

            </div>
        </div>
    </section>

    <!-- Footer -->

    <footer class="footer">
        <div class="container">
            <p>© 2026 Responsive Landing Page</p>
        </div>
    </footer>
<script>
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
menuBtn.addEventListener("click", () => {
if(navbar.classList.contains("active")){
    navbar.classList.remove("active");
}
else{
    navbar.classList.add("active");
}
});


</script>
</body>
</html>

## index.css

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial, sans-serif;
    line-height:1.6;
    background:#f5f5f5;
    color:#222;
}
.btn{
    padding:12px 24px;
    border:none;
    background:#111;
    color:white;
    cursor:pointer;
    border-radius:5px;
    transition: 0.2s;
    box-shadow:10px 10px 10px rgba(27, 27, 27, 0.1);
   
}
.btn:hover{
    transform: scale(1.1);
}
.container{
    width:90%;
    max-width:1200px;
    margin:auto;
}

.header{
    background:#111;
    color:white;
    padding:20px 0;
}

.header .container{
    display:flex;
    justify-content:space-between;
    align-items: center;
}

.logo{
    font-size:28px;
}

.navbar{
    display:flex;
    gap:20px;
    z-index: 1000;
    transition:0.3s ease;
}

.navbar a{
    text-decoration:none;
    color:white;
    font-size:16px;
    transition: 0.2s;
    padding: 10px;
}
.navbar a:hover{
    background-color: #555;
    border-radius: 10px;
    transform: translateX(5px);
}

.hero{
    padding:80px 0;
    background:white;
}

.hero-content{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:40px;
}

.hero-text{
    flex:1;
}

.hero-text h2{
    font-size:48px;
    margin-bottom:20px;
}

.hero-text p{
    margin-bottom:20px;
    color:#555;
}

.hero-image{
    flex:1;
}

.hero-image img{
    width:100%;
    border-radius:10px;
}

/* Services */

.services{
    padding:80px 0;
}

.section-title{
    text-align:center;
    margin-bottom:40px;
    font-size:36px;
}

.cards{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:25px;
}

.card{
    background:white;
    padding:30px;
    border-radius:10px;
    box-shadow:10px 10px 10px rgba(27, 27, 27, 0.1);
}

.card h3{
    margin-bottom:15px;
}

.footer{
    background:#111;
    color:white;
    text-align:center;
    padding:20px 0;
}

/* Responsive Design */
.menu-btn{
    display:none;
    font-size:28px;
    background:none;
    border:none;
    color:white;
    cursor:pointer;
    padding: 10px;
    border-radius:50%;
}
.menu-btn:hover{
    background-color: #555;
}
@media(max-width:768px){

    .menu-btn{
        display:block;
    }

    

    .navbar{
        display:none;
        width:100%;
        position:absolute;
        top:80px;
        left:0;

        background:#000;
        flex-direction:column;

        padding:30px;
        gap:20px;
    }

    .navbar.active{
        display:flex;
    }

    .hero-content{
        flex-direction:column;
        text-align:center;
    }

    .hero-text h2{
        font-size:36px;
    }

    .cards{
        grid-template-columns:1fr;
    }
}

