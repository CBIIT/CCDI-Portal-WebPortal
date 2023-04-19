import newsCCDC from '../assets/news/News_CCDC.png';
import newsMolecular from '../assets/news/News_Molecular.png';
import newsSymposium from '../assets/news/News_Symposium.png';
import newsCancerPlan from '../assets/news/News_CancerPlan.png';

export const newsList = [
    {
        id: 'ccdc',
        title: 'Childhood Cancer Data Catalog April Update ',
        date: 'APRIL 19, 2023',
        content: 'The <a href="https://datacatalog.ccdi.cancer.gov/" target="_blank" rel="noopener noreferrer">Childhood Cancer Data Catalog</a> is pleased to announce an April update which includes 1 new resource, 8 new datasets, and many other data updates.',
        fullText: '',
        type: 'Application Updates',
        img: newsCCDC,
    },
    {
        id: 'molecular',
        title: 'Molecular characterization results returned to more than 1,000 participants ',
        date: 'APRIL 5, 2023',
        content: 'In March, enrollment in the |CCDI Molecular Characterization Initiative@https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative/data-ecosystem/molecular-characterization?cid=eb_govdel| reached 1,000 children, adolescents, and young adults (AYAs) participants newly diagnosed with certain types of cancer. ',
        fullText: '',
        type: 'Application Updates',
        img: newsMolecular,
    },
    {
        id: 'symposium',
        title: '2023 CCDI Symposium ',
        date: 'APRIL 4, 2023',
        content: 'On March 24, 2023, NCI hosted the Childhood Cancer Data Initiative Annual Symposium. More than 800 researchers, clinicians, survivors, and families from the community gathered to discuss how enhanced data connection and sharing can address current issues and possibilities in childhood cancer research.',
        fullText: '',
        type: 'News & Other',
        img: newsSymposium,
    },
    {
        id: 'national_cancer_plan',
        title: 'National Cancer Plan',
        date: 'APRIL 3, 2023',
        content: 'On April 3, National Cancer Institute released the |National Cancer Plan@https://nationalcancerplan.cancer.gov| to engage the broadest possible community to work together to end cancer as we know it.',
        fullText: '',
        type: 'News & Other',
        img: newsCancerPlan,
    },
]