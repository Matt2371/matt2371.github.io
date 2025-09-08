// assets/data.js
// ========================
// Prefilled for Matthew Chen (UC Davis). Update at will.

export const SITE = {
  name: "Matthew Chen",
  role: "PhD Student",
  location: "UC Davis",
  email: "mattc2371@gmail.com", // optional — add your email if you'd like the mail link to work
  social: [
    { label: "GitHub", url: "https://github.com/Matt2371" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/chenmatthew37/" }
  ],
  banner: "/assets/images/banner.jpg",   // replace with your banner image
  headshot: "/assets/images/headshot.jpg" // replace with your headshot
};

// 🧪 Research projects
export const RESEARCH = {
  overview: `I study methods for planning and managing water resources under nonstationary climate and land-use change, with an emphasis on reservoir performance, adaptation timing, and data-driven decision support.`,
  items: [
    {
      title: "Detection time for nonstationary reservoir system performance driven by climate and land use change",
      image: "/assets/images/research-1.jpg", // replace
      url: "https://ascelibrary.org/doi/abs/10.1061/JWRMD5.WRENG-6184",
      summary: `Detect changes in water supply and flood performance outside the envelope of natural variability, and attribute the timing of these detections to uncertain drivers. Train a logistic regression classifier to predict future detections given recent observations.`
    }
  ]
};

// 🧰 Side Projects
export const PROJECTS = {
  overview: `Selected personal projects exploring scientific ML and physics-informed modeling.`,
  items: [
    {
      title: "PINN for Navier-Stokes (PyTorch)",
      image: "/assets/images/project-1.jpg", // replace
      url: "https://github.com/Matt2371/PINN_navier_stokes",
      summary: `Implementation of a Physics-Informed Neural Network for the Navier-Stokes equations in PyTorch, trained and validated on DNS data (Raissi et al., 2019) for flow past a cylinder at Re=100.`
    }
  ]
};

// 📝 Notes entries — titles link to downloadable PDFs in /files
export const NOTES = {
  overview: `I find it helpful to organize my fundamental knowledge in the form of notes, which I occasionally revisit to review or to update with new knowledge. Please feel free to reference them too, or message me with any feedback you might have!`,
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
      image: "/assets/images/notes-1.png",
      summary: "Overview of supervised and unsupervised ML methods, plus an introduction to deep learning and sequence modeling with Transformers."
    },
    {
      title: "Linear Regression",
      pdf: "/files/Linear_Regression.pdf",
      image: "/assets/images/notes-1.png",
      summary: "Review of statistical modeling using linear models."
    },
    {
      title: "Inferential Statistics",
      pdf: "/files/Inferential_Statistics.pdf",
      image: "/assets/images/notes-1.png",
      summary: "Introduction to mathematical statistics including estimation methods, hypothesis testing, and related topics."
    },
    {
      title: "Linear Algebra Review",
      pdf: "/files/Linear_Algebra_Review.pdf",
      image: "/assets/images/notes-1.png",
      summary: "Brief review of eigenvalue decomposition, quadratic forms, projections, and other selected linear algebra topics."
    }
  ]
};