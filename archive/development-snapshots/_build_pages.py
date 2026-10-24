# -*- coding: utf-8 -*-
from _chrome import page

def w(name, html):
    with open(name, "w", encoding="utf-8") as f:
        f.write(html)

about_body = '''
<section class="section">
  <div class="wrap split">
    <div>
      <p class="kicker">Organisation</p>
      <h2>An integrated life-sciences research company</h2>
      <p>Ciencia Life Sciences is an integrated life-sciences research company offering research training, services and innovative solutions to the life-sciences community. The company was started by PhD holders with a proficient research background. During their doctorate programmes they observed the need for an integrated service provider for fast-growing life-sciences and biotech companies and academics.</p>
      <p>The motto is to provide good training in research by qualified professionals, together with integrated consulting and outsourcing of research.</p>
      <p>Ciencia is a bioinformatics training organisation located in Hyderabad. It provides services and training in bioinformatics and cheminformatics. Advanced trainings, short courses, summer projects and Bio-IT courses (BioPerl, Python) are offered in both classroom and online formats.</p>
      <p>Ciencia also supports researchers by analysing data from their projects and by helping write projects for funding agencies and publications. The data-analysis group can help move a research project forward in a number of ways and has the experience to assist at every step. Clinical trials and pharma research are supported by applying cheminformatics tools.</p>
      <p>Confidentiality is maintained for those who use the services. Ciencia is committed to safeguarding personal information. All information provided is securely maintained and kept strictly confidential.</p>
    </div>
    <aside class="card">
      <h3>Working hours</h3>
      <div class="hours">
        <div><span>Monday–Saturday</span><span>9:30 am – 5:00 pm</span></div>
        <div><span>Sunday</span><span>Closed</span></div>
      </div>
      <p style="margin-top:1rem">Hyderabad · Classroom and online training</p>
      <a class="btn btn--primary" href="contact.html">Contact the team</a>
    </aside>
  </div>
</section>
<section class="section section--paper" id="founder">
  <div class="wrap split">
    <figure class="portrait founder-logo">
      <img src="img/ciencia-mark.jpg" alt="Ciencia Life Sciences logo">
      <figcaption><strong>Dr. Sabitha Yadam</strong><br>CEO and Research Head</figcaption>
    </figure>
    <div>
      <p class="kicker">Founder</p>
      <h2>Dr. Sabitha Yadam</h2>
      <p>Dr. Sabitha Yadam is CEO and Research Head at Ciencia Labs LLP, Hyderabad, with extensive experience in academia and research. She has worked as Research Head at Ciencia Life Sciences, Assistant Professor at JNIAS, and Research Associate at institutions including Indo-American Cancer Hospital and Mahavir Hospital.</p>
      <p>Her expertise spans drug design, cheminformatics, pharmacogenomics, molecular biology, probiotics, nanotechnology and AI-driven drug discovery. She has contributed through patents, publications and conference presentations, has guided over 500 students, and has organised national conferences and workshops.</p>
      <p>She holds a Ph.D. in Biotechnology from JNTU, Hyderabad, with a research focus on molecular mechanisms and oxidative stress in smokers with head and neck squamous cell carcinoma. Bioinformatics skills include molecular docking, QSAR studies and computational drug design.</p>
    </div>
  </div>
</section>
<section class="section" id="advisory">
  <div class="wrap">
    <div class="section-head">
      <p class="kicker">Advisory Board</p>
      <h2>Scientific advisors</h2>
    </div>
    <div class="people">
      <article class="person">
        <img src="img/kaiser_jamil.jpg" alt="Dr. Kaiser Jamil">
        <div>
          <h3>Dr. Kaiser Jamil</h3>
          <p>A distinguished scientist in biotechnology, cancer biology, pharmacogenomics and toxicogenomics. She serves as Dean and Director of the School of Life Sciences at Jawaharlal Nehru Institute of Advanced Studies (JNIAS) and is Emeritus Research Scientist and Head of the Genetics Department at Bhagwan Mahavir Medical Research Centre, Hyderabad.</p>
          <p>She previously held key positions at CSIR-IICT, CCMB and the Indo-American Cancer Institute. Dr. Jamil has published over 295 research papers, authored books and supervised numerous Ph.D. students. She has received awards including a Lifetime Achievement Award and fellowships from scientific societies. Research focuses on cancer biomarkers, SNP analysis, drug–gene interactions and environmental genotoxicity.</p>
        </div>
      </article>
      <article class="person">
        <img src="img/mvv.jpeg" alt="Dr. Vishnu Vardhan Reddy Martha">
        <div>
          <h3>Dr. Vishnu Vardhan Reddy Martha</h3>
          <p>Professor in the Department of Otolaryngology–Head and Neck Surgery at Malla Reddy Institute of Medical Sciences, Hyderabad, and Adjunct Professor at Drexel University College of Medicine, USA. He specialises in head and neck surgery, audiology and voice disorders.</p>
          <p>His research includes syndromic and non-syndromic deafness, head and neck cancers and laryngeal disorders, with publications, international collaborations and mentorship of Ph.D. candidates. He has served in leadership and advisory roles in institutions and medical committees.</p>
        </div>
      </article>
      <article class="person">
        <img src="img/uma.jpeg" alt="Dr. A. Uma">
        <div>
          <h3>Dr. A. Uma</h3>
          <p>Associate Professor at the Centre for Biotechnology, Institute of Science and Technology, Jawaharlal Nehru Technological University (JNTU), Hyderabad. She specialises in biochemistry, biotechnology and biofuels research, with expertise in enzyme engineering, metabolic studies and bioethanol production.</p>
          <p>She has led research projects funded by DST, DBT, AICTE and CSIR, focusing on biofuel production, obesity-related metabolic studies and molecular biomarker analysis. Dr. Uma has organised scientific workshops and conferences and has contributed publications and patents.</p>
        </div>
      </article>
      <article class="person">
        <img src="img/rambabu.jpeg" alt="Dr. Rambabu Gundla">
        <div>
          <h3>Dr. Rambabu Gundla</h3>
          <p>Professor in the Department of Chemistry at GITAM University, Hyderabad. He specialises in the discovery and development of biologically active compounds, including anti-inflammatory, antiviral, anticancer and antidiabetic agents.</p>
          <p>With a Ph.D. from Osmania University and postdoctoral research at the University of Southern California, he has over 106 publications, 16 patents, and experience in computer-aided drug design, SAR, QSAR, molecular docking and virtual screening. He has collaborated with pharmaceutical companies and led government-funded research projects.</p>
        </div>
      </article>
      <article class="person">
        <img src="img/katari.jpeg" alt="Dr. N. K. Katari">
        <div>
          <h3>Dr. N. K. Katari</h3>
          <p>Assistant Professor in the Department of Chemistry at GITAM Deemed to be University, Hyderabad. With over 16 years of research and 12 years of teaching experience, his expertise is in analytical and organic chemistry, particularly Quality by Design-based method development, risk analysis and green analytical tools.</p>
          <p>He has 185 research papers, 20 patents, and funded and consultancy projects. He has international research exposure with institutions in the USA, South Africa and China, and has served as scientific advisor, reviewer and editorial board member. Research focuses on drug analysis, impurity profiling, chromatography, spectroscopy and pharmaceutical formulations. He has guided Ph.D. and M.Sc. students and has received a university gold medal and best researcher awards.</p>
        </div>
      </article>
    </div>
  </div>
</section>
'''

w("aboutus.html", page(
    "About Ciencia Life Sciences | Founder and Advisory Board",
    "Ciencia Life Sciences is an integrated Hyderabad life-sciences research company offering training, services and solutions. Meet the founder and advisory board.",
    '<a href="index.html">Home</a> / About',
    "About Ciencia Life Sciences",
    "Research training, consulting and outsourcing for the life-sciences community, led by researchers.",
    about_body, "aboutus.html"))

facilities = ["ELISA reader","Conventional PCR","SDS PAGE","UV transilluminator","Electrophoresis DNA separations","Spectrophotometer","Fermenter","Soxhleter","Water purification system","Micro centrifuge","Clinical centrifuge","Gel documentation facility","Biosafety cabinet","Laminar air flow system","Bacteriological incubator","Colony counter","Inverted phase contrast microscope","Incubator shaker","Autoclave","Loop sterilizer","UV-Visible spectrophotometer","Other general laboratory equipment","Micro balance","Hot air oven","pH meter","Quick spin","Magnetic stirrer","Vortex mixture","-80/-20 freezers","Dry bath","Water bath","Bioinformatics software"]
fac_items = "".join(f"<li>{x}</li>" for x in facilities)
fac_body = f'''
<section class="section">
  <div class="wrap">
    <p>Research students benefit from doctoral faculty teaching, current research resources and equipment, dedicated staff, and information technology including bioinformatics and cheminformatics for research analysis.</p>
    <p>Ciencia admits academically able and motivated students and aims to provide strong teaching, resources and facilities. Facilities are continually updated across life-sciences subject areas. A number of facilities are also available for commercial testing and consultancy.</p>
    <h2>Facilities available in the laboratory</h2>
    <ul class="facility-grid">{fac_items}</ul>
    <p class="muted" style="margin-top:1.5rem">The original listing uses “Soxhleter” for Soxhlet apparatus. The spelling is retained as published.</p>
  </div>
</section>
'''
w("Facilities.html", page(
    "Laboratory Facilities | Ciencia Life Sciences",
    "Laboratory equipment at Ciencia Life Sciences including PCR, electrophoresis, biosafety cabinets, spectrophotometers, fermenter, gel documentation and bioinformatics software.",
    '<a href="index.html">Home</a> / Facilities',
    "Laboratory facilities",
    "Doctoral teaching, laboratory equipment and computational resources for research, training and consultancy.",
    fac_body, "Facilities.html"))

career_body = '''
<section class="section">
  <div class="wrap split">
    <div>
      <p>To build on current success and continuous development, Ciencia welcomes speculative enquiries and applications from people with the right attitude, appropriate experience and/or a similar industrial background, and relevant qualifications with a master’s degree in life sciences.</p>
      <p>Through its policies and procedures, Ciencia is committed to ensuring that recruitment, selection, promotion and development of employees is conducted in a manner that is systematic, effective and promotes equality and opportunity for all.</p>
      <p>No specific open vacancy list is published on the current site. Applications are received speculatively.</p>
    </div>
    <aside class="card">
      <h3>How to apply</h3>
      <p>Post your CV to <a href="mailto:ciencialifescience@gmail.com">ciencialifescience@gmail.com</a>.</p>
      <p class="muted">The career address uses ciencialifescience@gmail.com. General enquiries may also use ciencialifesciences@gmail.com.</p>
      <a class="btn btn--primary" href="mailto:ciencialifescience@gmail.com">Email CV</a>
    </aside>
  </div>
</section>
'''
w("carrer.html", page(
    "Careers | Ciencia Life Sciences",
    "Speculative applications are welcome from candidates with a master’s degree in life sciences. Email your CV to Ciencia Life Sciences.",
    '<a href="index.html">Home</a> / Career',
    "Careers",
    "Systematic, equal recruitment for people with relevant life-sciences qualifications.",
    career_body, "carrer.html"))

contact_body = '''
<section class="section">
  <div class="wrap grid grid-2">
    <div>
      <h2>Organisation details</h2>
      <div class="card">
        <p><strong>Visit</strong><br>Ciencia Lifesciences<br>Sardarpatel Nagar, Nizampet X Roads, Kukatpally<br>Hyderabad, India 500085</p>
        <p><strong>Call or WhatsApp</strong><br><a href="tel:+918247307129">+91 8247307129</a><br><a href="tel:+919966239797">+91 9966239797</a></p>
        <p><strong>Email</strong><br><a href="mailto:ciencialifesciences@gmail.com">ciencialifesciences@gmail.com</a></p>
        <p><strong>Website</strong><br>www.ciencialifesciences.com</p>
        <p><strong>Hours</strong><br>Monday–Saturday, 9:30 am – 5:00 pm<br>Sunday closed</p>
      </div>
    </div>
    <div>
      <h2>Start an enquiry</h2>
      <p>For research, training, project, publication and registration questions, use the contact details or complete the registration form.</p>
      <div class="btn-row">
        <a class="btn btn--primary" href="https://docs.google.com/forms/d/e/1FAIpQLScd2OQSTwebJW9BtFuSX1WdUNum8A2XzXa97V6GNqbvfL8elg/viewform?usp=header" target="_blank" rel="noopener noreferrer">CLS Internship and Project Registration Form</a>
      </div>
      <p class="muted">The previous contact page showed “Getting Ready…”. Full contact details from the organisation footer are now presented here.</p>
    </div>
  </div>
</section>
'''
w("contact.html", page(
    "Contact Ciencia Life Sciences | Hyderabad",
    "Contact Ciencia Life Sciences in Kukatpally, Hyderabad. Phone +91 8247307129, +91 9966239797, email ciencialifesciences@gmail.com.",
    '<a href="index.html">Home</a> / Contact',
    "Contact",
    "Visit, call, write or register for training, projects and research services.",
    contact_body, "contact.html"))

print("wrote about, facilities, career, contact")
