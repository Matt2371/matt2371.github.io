// assets/data.js
// ========================
// Prefilled for Matthew Chen (UC Davis). Update at will.

export const SITE = {
  name: "Matthew Chen",
  role: "PhD Student",
  location: "UC Davis", // not shown on Home per request
  //email: "mattc2371@gmail.com", // optional — add your email if you'd like an email icon
  social: [
    { label: "Email", url: "mailto:mattc2371@gmail.com" },
    { label: "GitHub", url: "https://github.com/Matt2371" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/chenmatthew37/" } // replace with your profile or remove
  ],
  banner: "/assets/images/banner.jpg",   // replace with your banner image
  headshot: "/assets/images/headshot.jpg" // replace with your headshot
};

// 🧪 Research projects
export const RESEARCH = {
  overview: `Please check out my published research! I develop machine learning, reinforcement learning, and optimization methods for water resources decision-making under uncertainty. Feel free to reach out if you need access or have any questions. <a href="https://scholar.google.com/citations?user=O_e6X_UAAAAJ&hl=en"
     target="_blank" rel="noopener">Google Scholar</a>.`,
  items: [
    {
      title: "<strong>Chen, M.</strong><span class='rest'> and Herman, J. Detection time for nonstationary reservoir system performance driven by climate and land use change. ASCE Journal of Water Resources Planning and Management, 150 (4). 2024.</span>",
      image: "/assets/images/research-1.jpg", // replace
      url: "https://ascelibrary.org/doi/abs/10.1061/JWRMD5.WRENG-6184",
      summary: `Detect changes in water supply and flood performance outside the envelope of natural variability, and attribute the timing of these detections to uncertain drivers. 
      Train a logistic regression classifier to predict future detections given recent observations.`
    }
  ]
};

// 🧰 Side Projects
export const PROJECTS = {
  overview: `I included some of my side projects here, exploring different applications of data science that I found interesting. Respective GitHub repos are linked.`,
  items: [
    {
      title: "Solving the Navier-Stokes Equations using Neural Networks",
      image: "/assets/images/project-1.gif", // replace
      url: "https://github.com/Matt2371/PINN_navier_stokes",
      summary: `Implementation of a Physics-Informed Neural Network (PINN) for the Navier-Stokes equations in PyTorch, trained and validated on DNS data (Raissi et al., 2019) for flow past a cylinder at Re=100.`
    },
    {
      title: "Synthetic Control and Proposition 99",
      image: "/assets/images/project-2.png", // replace
      url: "https://github.com/Matt2371/Proposition99",
      summary: `Demonstration of the synthetic control method in causal inference using data from California's Proposition 99 (tobacco control) from Abadie et al. (2010).`
    }
  ]
};

// 📝 Notes entries — titles link to downloadable PDFs in /files
export const NOTES = {
  overview: `I've written notes in LaTeX on a variety of topics in AI/ML, RL, and statistics, which I occasionally revisit to review or to add new content. Please feel free to reference them or message me with feedback.`,
  items: [
    { 
      title: "Reinforcement Learning", 
      pdf: "/files/Reinforcement_Learning.pdf", 
      image: "/assets/images/notes-1.png", 
      summary: "Comprehensive introduction to reinforcement learning, from Q-learning to policy gradients, to learning from human feedback and additional topics." 
    },
    { 
      title: "Machine Learning", 
      pdf: "/files/Machine_Learning_Notes.pdf", 
      image: "/assets/images/notes-2.png", 
      summary: "Overview of supervised and unsupervised ML methods, plus an introduction to deep learning and sequence modeling with Transformers." 
    },
    { 
      title: "Linear Regression", 
      pdf: "/files/Linear_Regression.pdf", 
      image: "/assets/images/notes-3.png", 
      summary: "Review of statistical modeling using linear models." 
    },
    { 
      title: "Inferential Statistics", 
      pdf: "/files/Inferential_Statistics.pdf", 
      image: "/assets/images/notes-4.png", 
      summary: "Introduction to mathematical statistics including estimation methods, hypothesis testing, and related topics." 
    },
    { 
      title: "Linear Algebra Review", 
      pdf: "/files/Linear_Algebra_Review.pdf", 
      image: "/assets/images/notes-5.png", 
      summary: "Brief review of eigenvalue decomposition, quadratic forms, projections, and other core linear algebra topics." 
    }
  ]
};