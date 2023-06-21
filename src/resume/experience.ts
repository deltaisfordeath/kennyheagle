export type ExperienceItem = {
    dateRange: string;
    title: string;
    venue: string;
    description: string;
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
    {
        dateRange: 'FEB 2022 - PRESENT',
        title: 'FRONT END ENGINEER II (CONTRACTOR)',
        venue: 'VERIZON',
        description: 'Worked on a team developing a collaborative whiteboarding web app using React, MobX, RxJS, and other technologies. Worked on developing a rich, professional quality, multi-layer video streaming web app using React, Redux, Material UI, and other technologies. Received year end spotlight recognizing my outsized contributions to the projects I was assigned.'
    },
    {
        dateRange: 'MAY 2013 – FEB 2022',
        title: 'ACCOUNTING SYSTEMS MANAGER',
        venue: 'ADVANCED GLAZING SOLUTIONS, INC.',
        description: 'Managed all information technology, accounting, and compliance needs for a contracting firm in a small business environment. Automated monthly billing processes to reduce errors and increase productivity. Wrote Python scrips and Excel macros to aid in data validation for accounting records.'
    },
    {
        dateRange: 'FEB 2011 - MAY 2013',
        title: 'Financial Analyst/Underwriter',
        venue: 'Various',
        description: `First at Union Bank of California, then Alliant Capital, LLC. These jobs were soulless and depressing. I only included them so there wouldn't be a gap in my employment history.`
    },
    {
        dateRange: 'APR 2009 - DEC 2010',
        title: 'CLASSROOM IT SUPPORT',
        venue: 'BRIGHAM YOUNG UNIVERSITY',
        description: 'Provided fast paced in-class technical support for campus technology to minimize classroom downtime. Performed tests on classroom systems during off hours to prevent in-class technology issues.'
    }
]

export const EDUCATION_ITEMS: ExperienceItem[] = [
    {
        dateRange: 'Graduating 2025',
        title: 'Master of Software Engineering',
        venue: 'North Dakota State University',
        description: ''
    },
    {
        dateRange: 'Aug 2005 - Dec 2010',
        title: 'B.S. IN ACCOUNTING',
        venue: 'BRIGHAM YOUNG UNIVERSITY',
        description: `Courses:
        CS 100 – Fundamentals of Computing: Learned HTML, CSS, and Javascript.
        CS 142 – Intro to Programming: Learned object oriented programming in Java.
        CS 235 – Data Structures: Learned and constructed data structures in Java. Evaluated algorithm performance using Big O notation. Wrote Java applications with graphical user interfaces.
        ISYS – 401 – Business and Accounting Information Systems: Learned relational databases/SQL.
        `
    }
]


// {
//     dateRange: '',
//     title: '',
//     venue: '',
//     description: ''
// }