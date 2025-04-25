const jobForm = document.getElementById('jobForm');
    const jobList = document.getElementById('jobList');
    const searchInput = document.getElementById('searchInput');
    const filterCategory = document.getElementById('filterCategory');

    const defaultJobs = [
      {
        title: 'Frontend Developer',
        company: 'TechNova Inc.',
        image: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
        category: 'IT',
        description: 'Join our fast-paced team to build modern web applications using React.js and Tailwind CSS.'
      },
      {
        title: 'UI/UX Designer',
        company: 'Designify',
        image: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
        category: 'Design',
        description: 'We’re hiring creative thinkers with experience in Figma and Adobe XD to craft compelling user experiences.'
      },
      {
        title: 'Digital Marketing Executive',
        company: 'BrandBoost',
        image: 'https://cdn-icons-png.flaticon.com/512/2965/2965567.png',
        category: 'Marketing',
        description: 'Manage online campaigns, SEO, and analytics to increase brand visibility and engagement.'
      }
    ];

    let jobs = [...defaultJobs];

    function renderJobs() {
      const search = searchInput.value.toLowerCase();
      const filter = filterCategory.value;
      jobList.innerHTML = '';

      const filteredJobs = jobs.filter(job => {
        return (
          (job.title.toLowerCase().includes(search) || job.company.toLowerCase().includes(search)) &&
          (filter === '' || job.category === filter)
        );
      });

      filteredJobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'col-md-4 mb-4';
        jobCard.innerHTML = `
          <div class="card h-100" onclick="openJobDetail(${index})">
            <img src="${job.image}" class="company-logo" alt="Company Logo">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${job.company}</h6>
              <span class="badge bg-primary mb-2">${job.category}</span>
              <p class="card-text text-truncate">${job.description}</p>
            </div>
          </div>
        `;
        jobList.appendChild(jobCard);
      });
    }

    function openJobDetail(index) {
      const job = jobs[index];
      const modal = new bootstrap.Modal(document.getElementById('jobDetailModal'));
      document.getElementById('jobDetailContent').innerHTML = `
        <div class="text-center mb-3">
          <img src="${job.image}" class="img-fluid mb-3" style="max-height: 200px;">
          <h3>${job.title}</h3>
          <h5 class="text-muted">${job.company}</h5>
          <span class="badge bg-secondary">${job.category}</span>
        </div>
        <p>${job.description}</p>
      `;
      modal.show();
    }

    jobForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const newJob = {
        title: document.getElementById('jobTitle').value,
        company: document.getElementById('companyName').value,
        image: document.getElementById('companyImage').value,
        category: document.getElementById('jobCategory').value,
        description: document.getElementById('jobDescription').value
      };
      jobs.unshift(newJob);
      renderJobs();
      jobForm.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('jobModal'));
      modal.hide();
    });

    searchInput.addEventListener('input', renderJobs);
    filterCategory.addEventListener('change', renderJobs);

    document.addEventListener('DOMContentLoaded', renderJobs);