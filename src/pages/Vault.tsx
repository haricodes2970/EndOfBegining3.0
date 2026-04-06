import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import './Vault.css';



const students = [
  { id:  1, usn: '1JT22AI001', name: 'Akash M Athreyas'       },
  { id:  2, usn: '1JT22AI002', name: 'Amith Kashyap P S'      },
  { id:  3, usn: '1JT22AI003', name: 'Aryan M'                },
  { id:  4, usn: '1JT22AI004', name: 'Asritha Y'              },
  { id:  5, usn: '1JT22AI005', name: 'Bhuvanesh Kumar'        },
  { id:  6, usn: '1JT22AI006', name: 'Bindulakshmi G S'       },
  { id:  7, usn: '1JT22AI007', name: 'Chaitanya G'            },
  { id:  8, usn: '1JT22AI008', name: 'Chandana C Gowda'       },
  { id:  9, usn: '1JT22AI010', name: 'Chandana S'             },
  { id: 10, usn: '1JT22AI011', name: 'Chandra N'              },
  { id: 11, usn: '1JT22AI012', name: 'Diya K Bhat'            },
  { id: 12, usn: '1JT22AI013', name: 'Eshwar Siddartha'       },
  { id: 13, usn: '1JT22AI014', name: 'Harini V'               },
  { id: 14, usn: '1JT22AI015', name: 'J Sanjana'              },
  { id: 15, usn: '1JT22AI016', name: 'Jyothish S'             },
  { id: 16, usn: '1JT22AI017', name: 'K Vihar'                },
  { id: 17, usn: '1JT22AI018', name: 'Khushi S Sorathia'      },
  { id: 18, usn: '1JT22AI019', name: 'Kiran S Nair'           },
  { id: 19, usn: '1JT22AI020', name: 'Kruthika S'             },
  { id: 20, usn: '1JT22AI021', name: 'Kushal S'               },
  { id: 21, usn: '1JT22AI022', name: 'Lavanya G'              },
  { id: 22, usn: '1JT22AI023', name: 'M S J Navaneeth Ch'     },
  { id: 23, usn: '1JT22AI024', name: 'Manjesh T A'            },
  { id: 24, usn: '1JT22AI025', name: 'Manjunath D'            },
  { id: 25, usn: '1JT22AI026', name: 'Manoj G'                },
  { id: 26, usn: '1JT22AI027', name: 'Mayur N'                },
  { id: 27, usn: '1JT22AI028', name: 'Mayur Simha M'          },
  { id: 28, usn: '1JT22AI029', name: 'Mohith Kumar N'         },
  { id: 29, usn: '1JT22AI030', name: 'Monisha S P'            },
  { id: 30, usn: '1JT22AI031', name: 'N R Eshwar'             },
  { id: 31, usn: '1JT22AI032', name: 'Nitish G S'             },
  { id: 32, usn: '1JT22AI033', name: 'Poojitha K B'           },
  { id: 33, usn: '1JT22AI034', name: 'Prabhava R Bhat'        },
  { id: 34, usn: '1JT22AI035', name: 'Prajwal V'              },
  { id: 35, usn: '1JT22AI036', name: 'Rahul Sai L'            },
  { id: 36, usn: '1JT22AI037', name: 'Ramilla Narendra'       },
  { id: 37, usn: '1JT22AI038', name: 'Ranganath C'            },
  { id: 38, usn: '1JT22AI039', name: 'Rithu D'                },
  { id: 39, usn: '1JT22AI040', name: 'S Yashaswini'           },
  { id: 40, usn: '1JT22AI041', name: 'Sagar S'                },
  { id: 41, usn: '1JT22AI042', name: 'Sai Sharan R S'         },
  { id: 42, usn: '1JT22AI043', name: 'Sai Sujan Datta G'      },
  { id: 43, usn: '1JT22AI044', name: 'Samarth S L'            },
  { id: 44, usn: '1JT22AI045', name: 'Shravan C U'            },
  { id: 45, usn: '1JT22AI046', name: 'Shubhashree Rama'       },
  { id: 46, usn: '1JT22AI047', name: 'Sudarshan D J'          },
  { id: 47, usn: '1JT22AI048', name: 'Sujith A Donti'         },
  { id: 48, usn: '1JT22AI049', name: 'Suman R'                },
  { id: 49, usn: '1JT22AI050', name: 'Surabhi'                },
  { id: 50, usn: '1JT22AI051', name: 'Tejaswi M'              },
  { id: 51, usn: '1JT22AI052', name: 'Thanmayi B'             },
  { id: 52, usn: '1JT22AI053', name: 'Usha K'                 },
  { id: 53, usn: '1JT22AI054', name: 'Vinod Y'                },
  { id: 54, usn: '1JT22AI055', name: 'Vishruth S'             },
  { id: 55, usn: '1JT22AI056', name: 'Vivek Y Patel'          },
  { id: 56, usn: '1JT22AI057', name: 'Vivin Jayanth A M'      },
  { id: 57, usn: '1JT22AI058', name: 'Vrushank Skanda B'      },
  { id: 58, usn: '1JT22AI060', name: 'Yashwanth L'            },
  { id: 59, usn: '1JT22AI061', name: 'Tejaswini M'            },
  { id: 60, usn: '1JT22AI062', name: 'Monisha Bharadwaj'      },
  { id: 61, usn: '1JT22AI063', name: 'Kushal N S'             },
  { id: 62, usn: '1JT22AI064', name: 'Sinchana L'             },
  { id: 63, usn: '1JT23AI40',  name: 'Abhishek S'             },
];

export default function Vault() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page header
    gsap.fromTo('.pg-tag',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.3 }
    );
    gsap.fromTo('.pg-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.5 }
    );
    gsap.fromTo('.pg-desc',
      { opacity: 0, y: 20 },
      { opacity: 0.7, y: 0, duration: 0.8, delay: 0.7 }
    );

    // Stagger cards row by row as they enter viewport
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.student-ph-card');
    if (!cards) return;

    // Group into rows of 4
    const rows: HTMLElement[][] = [];
    cards.forEach((card, i) => {
      const row = Math.floor(i / 4);
      if (!rows[row]) rows[row] = [];
      rows[row].push(card);
    });

    rows.forEach(row => {
      gsap.fromTo(row,
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row[0],
            start: 'top 88%',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <div className="page-bg page-bg-vault" />
      <ParticleCanvas />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* PAGE HEADER */}
      <div className="page-hero">
        <p className="page-tag pg-tag">Chapter 03</p>
        <h1 className="page-title pg-title">The Vault</h1>
        <p className="page-subtitle pg-desc">
          Every face. Every name. The batch of 2022–26 — unfiltered and unforgettable.
        </p>
      </div>

      {/* STUDENT GRID */}
      <section className="vault-grid-section">
        <div className="vault-grid" ref={gridRef}>
          {students.map(s => (
            <div className="student-ph-card" key={s.id}>
              {/* Photo placeholder */}
              <div className="ph-photo">
                <div className="ph-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <div className="ph-number">{String(s.id).padStart(2, '0')}</div>
              </div>

              {/* Info */}
              <div className="ph-info">
                <div className="ph-name">{s.name}</div>
                <div className="ph-usn">{s.usn}</div>
              </div>

              {/* Hover shimmer */}
              <div className="ph-shimmer" />
            </div>
          ))}
        </div>
      </section>

      {/* BATCH COUNT FOOTER */}
      <div className="vault-footer">
        <p><span>63</span> students · BE AI &amp; ML · Batch 2022–26 · JIT Bengaluru</p>
      </div>
    </>
  );
}
