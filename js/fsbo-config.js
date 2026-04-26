const FSBOConfig = {
  stripe: {
    foundations: 'https://buy.stripe.com/eVqfZhaC63HiflG29r5os00',
    complete:    'https://buy.stripe.com/4gM28r39E3Hi6PadS95os01',
    masterclass: 'https://buy.stripe.com/14A00j8tY2Deddy5lD5os02',
  },

  // Access codes — generated via /admin/codegen.html
  // Each customer gets a unique code. Add new ones here after generating them.
  // Format: 'FSBO-X-XXXXXXXX': 'tier'
  accessCodes: {
    // Owner / test codes (keep private)
    'FSBO-F-OWNER001': 'foundations',
    'FSBO-C-OWNER001': 'complete',
    'FSBO-M-OWNER001': 'masterclass',
    // Add customer codes below — use /admin/codegen.html to generate them
  },
  courses: {
    foundations: {
      name: 'Foundations',
      price: 97,
      modules: [
        { id: 'foundations-1', title: 'FSBO Overview & Your Roadmap',      file: '/foundations/module-1.html' },
        { id: 'foundations-2', title: 'Pricing Your Home (CMA Basics)',     file: '/foundations/module-2.html' },
        { id: 'foundations-3', title: 'Writing Your Listing',               file: '/foundations/module-3.html' },
        { id: 'foundations-4', title: 'Showing Your Home Safely',           file: '/foundations/module-4.html' },
        { id: 'foundations-5', title: 'Understanding Purchase Contracts',   file: '/foundations/module-5.html' },
        { id: 'foundations-6', title: 'The Closing Process',                file: '/foundations/module-6.html' },
      ]
    },
    complete: {
      name: 'Complete',
      price: 197,
      modules: [
        { id: 'complete-7',  title: 'Advanced Negotiation Tactics',         file: '/complete/module-7.html' },
        { id: 'complete-8',  title: 'Flat-Fee MLS & Zillow Strategy',       file: '/complete/module-8.html' },
        { id: 'complete-9',  title: 'Legal Disclosures by State',           file: '/complete/module-9.html' },
        { id: 'complete-10', title: 'Handling Inspections & Appraisals',    file: '/complete/module-10.html' },
        { id: 'complete-11', title: 'Digital Marketing for FSBO',           file: '/complete/module-11.html' },
        { id: 'complete-12', title: 'Offer & Counteroffer Templates',       file: '/complete/module-12.html' },
      ]
    },
    masterclass: {
      name: 'Masterclass',
      price: 397,
      modules: [
        { id: 'masterclass-13', title: 'Pricing Psychology & Auction Strategy', file: '/masterclass/module-13.html' },
        { id: 'masterclass-14', title: 'Photography & Virtual Tours',           file: '/masterclass/module-14.html' },
        { id: 'masterclass-15', title: 'Working With Buyer\'s Agents',          file: '/masterclass/module-15.html' },
        { id: 'masterclass-16', title: 'Tax Implications of Your FSBO Sale',    file: '/masterclass/module-16.html' },
      ]
    }
  },

  getCourseForModule(moduleId) {
    for (const [key, course] of Object.entries(this.courses)) {
      if (course.modules.find(m => m.id === moduleId)) return key;
    }
    return null;
  },

  getModule(moduleId) {
    for (const course of Object.values(this.courses)) {
      const m = course.modules.find(m => m.id === moduleId);
      if (m) return m;
    }
    return null;
  }
};
