import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

interface Course {
  id: number;
  title: string;
  description: string;
  syllabus: string[];
  price: number;
  duration: string;
  level: string;
}
@Component({
  selector: 'app-courses',
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  courses: Course[] = [
  {
    id: 1,
    title: 'Tally ERP 9',
    description: 'Learn professional accounting and GST billing using Tally ERP 9 for real-world business scenarios.',
    syllabus: [
      'Basics of accounting and company creation',
      'Ledger and voucher entry',
      'Inventory management in Tally',
      'GST configuration and GST returns',
      'Bank reconciliation and cost centers',
      'Financial reports: P&L, Balance Sheet, Trial Balance'
    ],
    price: 7999,
    duration: '2 Months',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Graphic Designing',
    description: 'Build creative visual designs for print, web, and social media using industry-standard tools.',
    syllabus: [
      'Design principles: color, typography, layout',
      'Adobe Photoshop for image editing',
      'Adobe Illustrator for logo and vector design',
      'Social media post and banner design',
      'Print media: flyers, brochures, business cards',
      'Portfolio preparation and basic branding concepts'
    ],
    price: 9999,
    duration: '3 Months',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Learn to build responsive, modern websites from scratch using HTML, CSS, and JavaScript.',
    syllabus: [
      'HTML5 structure and semantic tags',
      'CSS3 styling, Flexbox, and Grid',
      'Responsive design and media queries',
      'JavaScript basics and DOM manipulation',
      'Form validation and basic animations',
      'Intro to a frontend framework (e.g., Angular basics)'
    ],
    price: 12999,
    duration: '3 Months',
    level: 'Beginner'
  },
  {
    id: 4,
    title: 'Digital Marketing',
    description: 'Understand digital marketing strategies to grow brands through SEO, social media, and ads.',
    syllabus: [
      'Basics of digital marketing and funnels',
      'Search Engine Optimization (SEO) fundamentals',
      'Social media marketing (Facebook, Instagram, YouTube)',
      'Google Ads and basic campaign setup',
      'Email marketing basics and tools',
      'Analytics, reporting, and content strategy'
    ],
    price: 10999,
    duration: '2.5 Months',
    level: 'Beginner'
  },
  {
    id: 5,
    title: 'Basic Computer',
    description: 'Get comfortable with computers, operating systems, and everyday office applications.',
    syllabus: [
      'Introduction to computers and operating systems',
      'Windows basics: files, folders, settings',
      'Microsoft Word: typing, formatting, documents',
      'Microsoft Excel basics: cells, formulas, tables',
      'Microsoft PowerPoint: simple presentations',
      'Internet, email, and safe browsing practices'
    ],
    price: 4999,
    duration: '1.5 Months',
    level: 'Beginner'
  },
  {
    id: 6,
    title: 'Advanced Excel',
    description: 'Master Excel for data analysis, reporting, and automation in corporate environments.',
    syllabus: [
      'Advanced formulas and nested functions',
      'Conditional formatting and data validation',
      'Lookup functions: VLOOKUP, XLOOKUP, INDEX-MATCH',
      'PivotTables and PivotCharts',
      'Data cleaning and text functions',
      'Macros basics and simple automation'
    ],
    price: 6999,
    duration: '1.5 Months',
    level: 'Intermediate'
  },
  {
    id: 7,
    title: 'ADCA (Advanced Diploma in Computer Applications)',
    description: 'Comprehensive diploma covering office tools, design, accounting, and basic programming.',
    syllabus: [
      'Computer fundamentals and OS concepts',
      'MS Office (Word, Excel, PowerPoint, Access)',
      'Internet and email operations',
      'Basic graphic design (CorelDRAW / Photoshop basics)',
      'Tally basics for accounting',
      'Intro to programming (C or Python basics)'
    ],
    price: 14999,
    duration: '12 Months',
    level: 'Beginner'
  },
  {
    id: 8,
    title: 'DCA (Diploma in Computer Applications)',
    description: 'Foundation course in computer applications for students and beginners.',
    syllabus: [
      'Computer fundamentals and hardware basics',
      'Windows and file management',
      'MS Word, Excel, and PowerPoint',
      'Internet, email, and online services',
      'Basic typing and document formatting',
      'Introduction to databases or simple projects'
    ],
    price: 9999,
    duration: '6 Months',
    level: 'Beginner'
  },
  {
    id: 9,
    title: 'C/C++ Programming',
    description: 'Learn structured and object-oriented programming using C and C++.',
    syllabus: [
      'C basics: variables, data types, operators',
      'Control statements and loops',
      'Arrays, strings, and functions',
      'Pointers and dynamic memory in C',
      'C++ classes, objects, and constructors',
      'Inheritance, polymorphism, and basic STL'
    ],
    price: 8999,
    duration: '2.5 Months',
    level: 'Intermediate'
  },
  {
    id: 10,
    title: 'Python Programming',
    description: 'Start coding with Python for automation, scripting, and basic application development.',
    syllabus: [
      'Python syntax, variables, and data types',
      'Control flow: if, loops, comprehensions',
      'Functions and modules',
      'Lists, tuples, dictionaries, sets',
      'File handling and error handling',
      'Intro to libraries (e.g., pandas / matplotlib basics)'
    ],
    price: 8999,
    duration: '2.5 Months',
    level: 'Beginner'
  },
  {
    id: 11,
    title: 'AutoCAD',
    description: 'Learn 2D drafting and basic 3D concepts for engineering and architectural drawings.',
    syllabus: [
      'AutoCAD interface and drawing tools',
      'Drawing lines, circles, arcs, and shapes',
      'Modify tools: trim, extend, offset, fillet',
      'Layers, dimensions, and annotations',
      'Blocks, hatching, and layouts',
      'Printing, plotting, and basic 3D view concepts'
    ],
    price: 11999,
    duration: '2 Months',
    level: 'Beginner'
  }
];

}
