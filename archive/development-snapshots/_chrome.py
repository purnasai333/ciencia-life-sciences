NAV = '''  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="index.html">
        <img src="img/ciencia-mark.jpg" alt="Ciencia Life Sciences logo">
        <span><strong>CIENCIA LIFE SCIENCES</strong><span>Hyderabad</span></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button>
      <nav class="primary-nav" aria-label="Primary">
        <div class="menu-item">
          <button class="menu-trigger" type="button" aria-expanded="false">About</button>
          <div class="mega">
            <a href="aboutus.html">About Ciencia<small>Organisation, founding context and approach</small></a>
            <a href="aboutus.html#founder">Founder<small>Dr. Sabitha Yadam</small></a>
            <a href="aboutus.html#advisory">Advisory Board</a>
          </div>
        </div>
        <div class="menu-item">
          <button class="menu-trigger" type="button" aria-expanded="false">Research</button>
          <div class="mega">
            <a href="project.html">Research projects</a>
            <a href="Research.html">Research services</a>
            <a href="bioinfo.html">Bioinformatics</a>
            <a href="bioinfo.html#cheminformatics">Cheminformatics</a>
          </div>
        </div>
        <div class="menu-item">
          <button class="menu-trigger" type="button" aria-expanded="false">Training</button>
          <div class="mega">
            <a href="training.html">Training programmes</a>
            <a href="summar_certificate_syllabus.html">CADD &amp; lab syllabi</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScd2OQSTwebJW9BtFuSX1WdUNum8A2XzXa97V6GNqbvfL8elg/viewform?usp=header" target="_blank" rel="noopener noreferrer">CLS Internship and Project Registration Form</a>
          </div>
        </div>
        <div class="menu-item">
          <button class="menu-trigger" type="button" aria-expanded="false">Services</button>
          <div class="mega">
            <a href="Research.html">Research services</a>
            <a href="ScientificWritings.html">Scientific writing</a>
            <a href="patent.html">IP &amp; patents</a>
          </div>
        </div>
        <a href="patent.html">IP &amp; Patents</a>
        <a href="Facilities.html">Facilities</a>
        <a href="carrer.html">Career</a>
        <a class="btn btn--primary" href="contact.html">Enquire now</a>
      </nav>
    </div>
  </header>
'''

FOOT = '''  <footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <h3>CIENCIA LIFE SCIENCES</h3>
        <p>Integrated life-sciences research, training and scientific support in Hyderabad.</p>
        <p>Sardarpatel Nagar, Nizampet X Roads, Kukatpally, Hyderabad, India 500085</p>
        <p><a href="tel:+918247307129">+91 8247307129</a><br><a href="tel:+919966239797">+91 9966239797</a><br><a href="mailto:ciencialifesciences@gmail.com">ciencialifesciences@gmail.com</a></p>
      </div>
      <div>
        <h3>Explore</h3>
        <ul>
          <li><a href="aboutus.html">About</a></li>
          <li><a href="project.html">Projects</a></li>
          <li><a href="training.html">Training</a></li>
          <li><a href="Research.html">Research services</a></li>
          <li><a href="bioinfo.html">Bioinformatics</a></li>
        </ul>
      </div>
      <div>
        <h3>Services</h3>
        <ul>
          <li><a href="ScientificWritings.html">Scientific writing</a></li>
          <li><a href="patent.html">IP &amp; patents</a></li>
          <li><a href="Facilities.html">Facilities</a></li>
          <li><a href="carrer.html">Career</a></li>
          <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScd2OQSTwebJW9BtFuSX1WdUNum8A2XzXa97V6GNqbvfL8elg/viewform?usp=header" target="_blank" rel="noopener noreferrer">CLS Internship and Project Registration Form</a></li>
        </ul>
      </div>
      <div>
        <h3>Hours</h3>
        <div class="hours">
          <div><span>Monday–Saturday</span><span>9:30 am – 5:00 pm</span></div>
          <div><span>Sunday</span><span>Closed</span></div>
        </div>
        <p style="margin-top:1rem"><a href="https://www.twitter.com/cienciajournals">Twitter</a> · <a href="https://www.facebook.com/cienciajournals">Facebook</a></p>
      </div>
    </div>
    <div class="wrap legal">
      <span>Copyright © <span data-year>2017</span> Ciencia Life Sciences. All rights reserved.</span>
      <span>www.ciencialifesciences.com</span>
    </div>
  </footer>
  <a class="whatsapp" href="https://wa.me/918247307129" target="_blank" rel="noopener" aria-label="WhatsApp Ciencia Life Sciences">
    <img src="img/whatsapp.svg" alt="">
  </a>
  <script src="js/site.js"></script>
  <script src="js/ciencia-chatbot.js"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create','UA-105678237-1','auto'); ga('send','pageview');
  </script>
</body>
</html>
'''

def page(title, description, crumbs, hero_title, hero_lead, body, canonical):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="https://www.ciencialifesciences.com/{canonical}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="img/banner-image.jpg">
  <link rel="icon" href="img/ciencia-mark.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/ciencia.css">
</head>
<body>
{NAV}
  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="crumbs">{crumbs}</p>
        <h1>{hero_title}</h1>
        <p>{hero_lead}</p>
      </div>
    </section>
    {body}
  </main>
{FOOT}
'''
