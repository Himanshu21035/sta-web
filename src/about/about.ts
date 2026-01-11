import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
  animations: [
    // Fade in up animation
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),

    // Stagger animation for stats
    trigger('staggerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ], { params: { delay: 0 } })
    ]),

    // Card animation
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) rotateX(-10deg)' }),
        animate('600ms {{delay}}ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ opacity: 1, transform: 'translateY(0) rotateX(0)' }))
      ], { params: { delay: 0 } })
    ]),

    // Slide in animation
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('700ms {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { delay: 0 } })
    ]),

    // Scale animation
    trigger('scaleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('500ms {{delay}}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ], { params: { delay: 0 } })
    ])
  ]
})
export class About {
 hoveredCard: number | null = null;

  stats = [
    { number: '1200+', label: 'Students Trained' },
    { number: '95%', label: 'Placement Rate' },
    { number: '7+', label: 'Years Experience' },
    { number: '15+', label: 'Partner Companies' },
    { number: '2', label: 'Service Locations' },
    { number: '25+', label: 'Course Programs' }
  ];

  // Accounting & Finance Courses
  accountingCourses = [
    {
      icon: 'auto_stories',
      title: 'Basic Tally / Tally Fundamentals',
      description: 'Master accounting basics with Tally software—company setup, voucher entry, ledgers, inventory, and financial reporting for real-world business'
    },
    {
      icon: 'trending_up',
      title: 'Advanced Tally & Practical Accounting',
      description: 'Deep dive into advanced features: inventory control, cost centers, budgets, financial statements, and complex business scenarios'
    },
    {
      icon: 'receipt_long',
      title: 'GST (Goods & Services Tax) Training',
      description: 'Comprehensive GST concepts with hands-on practice in recording GST-compliant transactions, managing returns, and generating reports'
    },
    {
      icon: 'payments',
      title: 'Payroll Management',
      description: 'Learn complete payroll setup in Tally including PF/ESI configuration, salary calculations, statutory compliance, and payroll reporting'
    },
    {
      icon: 'account_balance',
      title: 'TDS & Taxation Concepts',
      description: 'Understand TDS recording, tax compliance processing, and statutory deductions management within Tally for complete tax handling'
    }
  ];

  // Programming & Development Courses
  programmingCourses = [
    {
      icon: 'integration_instructions',
      title: 'Python Programming',
      description: 'Learn Python from fundamentals to advanced topics including data structures, OOP, file handling, and real-world project development'
    },
    {
      icon: 'code',
      title: 'C++ Programming',
      description: 'Master object-oriented programming with C++—classes, inheritance, polymorphism, STL, and building robust software applications'
    },
    {
      icon: 'terminal',
      title: 'Java Programming',
      description: 'Comprehensive Java training covering core concepts, OOP principles, exception handling, collections, and enterprise application development'
    },
    {
      icon: 'memory',
      title: 'Data Structures & Algorithms',
      description: 'Build strong programming foundation with DSA—arrays, linked lists, trees, graphs, sorting, searching, and problem-solving techniques'
    },
    {
      icon: 'smart_toy',
      title: 'AI & Machine Learning Fundamentals',
      description: 'Introduction to artificial intelligence, machine learning algorithms, data preprocessing, model training, and practical AI applications'
    }
  ];

  // Web & Digital Courses
  webDigitalCourses = [
    {
      icon: 'web',
      title: 'Web Development (Full Stack)',
      description: 'Build responsive modern websites from scratch—HTML5, CSS3, JavaScript, frameworks, backend integration, and deployment'
    },
    {
      icon: 'api',
      title: 'Frontend Development (React/Angular)',
      description: 'Master modern frontend frameworks, component architecture, state management, routing, and building dynamic single-page applications'
    },
    {
      icon: 'storage',
      title: 'Backend Development (Node.js/Python)',
      description: 'Learn server-side programming, RESTful APIs, database integration, authentication, and scalable backend architecture'
    },
    {
      icon: 'campaign',
      title: 'Digital Marketing',
      description: 'Complete digital marketing strategies—SEO, SEM, social media marketing, content marketing, email campaigns, and analytics'
    },
    {
      icon: 'ads_click',
      title: 'Social Media Marketing & Ads',
      description: 'Master Facebook, Instagram, LinkedIn advertising, campaign management, audience targeting, and ROI optimization'
    }
  ];

  // Design & Office Courses
  designOfficeCourses = [
    {
      icon: 'palette',
      title: 'Graphic Designing',
      description: 'Build creative visual designs for print, web, and social media using Adobe Photoshop, Illustrator, and industry-standard tools'
    },
    {
      icon: 'videocam',
      title: 'Video Editing & Motion Graphics',
      description: 'Create professional videos with Adobe Premiere Pro, After Effects—editing, transitions, effects, and motion graphics'
    },
    {
      icon: 'architecture',
      title: 'AutoCAD',
      description: 'Create precise technical drawings and 3D models using industry-standard CAD software for engineering and architecture'
    },
    {
      icon: 'table_chart',
      title: 'Advanced Excel & Data Analysis',
      description: 'Master advanced Excel functions, pivot tables, macros, VBA, data visualization, and business intelligence techniques'
    },
    {
      icon: 'description',
      title: 'Microsoft Office Suite',
      description: 'Complete proficiency in Word, Excel, PowerPoint, Outlook—professional documentation, presentations, and office productivity'
    }
  ];

  // Foundation Courses
  foundationCourses = [
    {
      icon: 'computer',
      title: 'Basic Computer Course',
      description: 'Get comfortable with computers, Windows OS, file management, internet, email, and everyday office applications for beginners'
    },
    {
      icon: 'school',
      title: 'ADCA (Advanced Diploma in Computer Applications)',
      description: 'Comprehensive diploma covering programming, office applications, internet, and digital skills for professional productivity'
    },
    {
      icon: 'workspace_premium',
      title: 'DCA (Diploma in Computer Applications)',
      description: 'Foundation diploma in computer fundamentals, MS Office, internet, and basic programming for career readiness'
    },
    {
      icon: 'security',
      title: 'Cyber Security Basics',
      description: 'Learn cybersecurity fundamentals, ethical hacking basics, network security, and protecting digital assets'
    }
  ];

  features = [
    {
      title: '100% Placement Support',
      icon: 'work',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      points: [
        'Dedicated placement cell with industry connections',
        'Professional resume building & LinkedIn optimization',
        'Mock interviews and technical interview preparation',
        'Job fairs with 50+ partner companies',
        'Guaranteed job assistance for eligible students'
      ]
    },
    {
      title: 'Industry-Certified Trainers',
      icon: 'verified',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      points: [
        '10+ years of real-world industry experience',
        'Certified professionals in their respective domains',
        'One-on-one personalized mentoring sessions',
        'Live project supervision and code reviews',
        'Industry best practices and tips'
      ]
    },
    {
      title: 'Practical Hands-On Training',
      icon: 'touch_app',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      points: [
        'Live project work on real business scenarios',
        'Industry case studies and problem-solving',
        'State-of-the-art computer labs',
        'Build professional portfolio during training',
        '70% practical + 30% theory approach'
      ]
    },
    {
      title: 'Affordable Excellence',
      icon: 'savings',
      color: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
      points: [
        'Premium quality at affordable prices',
        'Flexible payment plans and EMI options',
        'No hidden charges or additional fees',
        'Best value for money in the region',
        'Scholarships for deserving students'
      ]
    },
    {
      title: 'Flexible Learning Options',
      icon: 'schedule',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      points: [
        'Weekend and weekday batch options',
        'Morning, afternoon, and evening slots',
        'Online live classes with recordings',
        'Self-paced learning materials',
        'Small batches (max 15 students) for personalized attention'
      ]
    },
    {
      title: 'Future-Ready Curriculum',
      icon: 'rocket_launch',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      points: [
        'AI and Machine Learning integrated courses',
        'Latest industry tools and technologies',
        'Regular curriculum updates based on market trends',
        'Cloud computing and modern frameworks',
        'Soft skills and communication training'
      ]
    }
  ];

  postCompletionSupport = [
    {
      icon: 'business_center',
      title: 'Job Placement Assistance',
      description: 'Continuous support until you land your dream job with our extensive employer network',
      features: [
        'Job referrals to 50+ partner companies',
        'Interview scheduling and follow-ups',
        'Salary negotiation guidance',
        'Multiple interview opportunities until placement',
        'Internship-to-job conversion programs'
      ]
    },
    {
      icon: 'groups',
      title: 'Alumni Network & Community',
      description: 'Join our thriving community of 2,500+ successful professionals for networking and growth',
      features: [
        'Exclusive alumni WhatsApp and LinkedIn groups',
        'Monthly alumni meetups and networking events',
        'Peer-to-peer learning and collaboration',
        'Industry insights from senior alumni',
        'Referral opportunities from alumni working in top companies'
      ]
    },
    {
      icon: 'help_center',
      title: 'Lifetime Doubt Clearing',
      description: 'Access to trainers for technical doubt resolution even after course completion',
      features: [
        'Dedicated support channels for alumni',
        'Monthly doubt-clearing sessions',
        'Email and chat support for technical queries',
        'Access to updated course materials',
        'Free attendance in refresher sessions'
      ]
    },
    {
      icon: 'school',
      title: 'Continuous Learning Resources',
      description: 'Stay updated with latest technologies through our exclusive learning portal',
      features: [
        'Access to recorded lectures and tutorials',
        'Regular webinars on emerging technologies',
        'Free workshops on new tools and frameworks',
        'Project ideas and coding challenges',
        'Industry trend updates and newsletters'
      ]
    },
    {
      icon: 'workspace_premium',
      title: 'Advanced Certification Support',
      description: 'Guidance and preparation for advanced certifications to boost your career',
      features: [
        'Preparation guidance for industry certifications',
        'Mock tests and practice materials',
        'Certification exam tips and strategies',
        'Discounted rates on advanced courses',
        'Career path counseling and roadmaps'
      ]
    },
    {
      icon: 'trending_up',
      title: 'Career Growth Mentorship',
      description: 'Long-term mentorship for career advancement and skill development',
      features: [
        'Quarterly one-on-one career counseling sessions',
        'Resume updates and LinkedIn profile optimization',
        'Skill gap analysis and upskilling recommendations',
        'Leadership and management training guidance',
        'Freelancing and entrepreneurship support'
      ]
    }
  ];

  values = [
    {
      icon: 'local_library',
      title: 'Accessibility',
      description: 'Making professional education accessible to every aspiring student in our community, regardless of their financial background'
    },
    {
      icon: 'emoji_events',
      title: 'Excellence',
      description: 'Uncompromising commitment to quality education and industry-standard training that produces job-ready professionals'
    },
    {
      icon: 'favorite',
      title: 'Student-Centric Approach',
      description: 'Every student matters—personalized attention, flexible timings, and customized learning paths for individual success'
    },
    {
      icon: 'handshake',
      title: 'Integrity & Trust',
      description: 'Transparent pricing, honest career guidance, and ethical practices that have earned us the community\'s trust'
    },
    {
      icon: 'lightbulb',
      title: 'Innovation',
      description: 'Constantly evolving our curriculum with AI, ML, and future-proof technologies to keep students ahead of the curve'
    },
    {
      icon: 'diversity_3',
      title: 'Community Impact',
      description: 'Empowering local talent, creating employment opportunities, and contributing to the region\'s economic growth'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.stats.forEach((stat, index) => {
      (stat as any).delay = index * 100;
    });
  }

  onHoverCard(index: number): void {
    this.hoveredCard = index;
  }

  onLeaveCard(index: number): void {
    this.hoveredCard = null;
  }
}
