import React, { useState } from "react";
import styles from "./Syllabus.module.css";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineLiveTv,
  MdOutlineLaptopMac,
} from "react-icons/md";
import { SiCodeproject, SiTimescale } from "react-icons/si";
import Form from "../../Form/Form";
import { BsFillCircleFill } from "react-icons/bs";

import { AiOutlineDownload } from "react-icons/ai";
import Popup from "../../Popup/Popup";

function Syllabus({ dataScience }) {
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  const [state, setState] = useState([
    {
      id: 0,
      open: true,
    },
    {
      id: 1,
      open: false,
    },
    {
      id: 2,
      open: false,
    },
    {
      id: 3,
      open: false,
    },
    {
      id: 4,
      open: false,
    },
    {
      id: 5,
      open: false,
    },
    {
      id: 6,
      open: false,
    },
  ]);
  const handleChange = (index) => {
    setState(
      state.map((faq, i) => {
        if (i === index) {
          console.log(faq);
          faq.open = !faq.open;
          console.log(faq.open);
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <section className={styles.Syllabus}>
      <Popup
        trigger={popups}
        setTrigger={setPopups}
        className="popupModal"
        downloadBrochure
      >
        <div className="leftPopup">
          <div
            className="whiteP"
            style={{ width: "350px", height: "400px" }}
          ></div>
        </div>
        <div className="RightPopup">
          <h5>Download Data science course Brochure</h5>
          <p>Please enter the following details to initiate your download</p>
          <Form
            setTrigger={setPopups}
            downloadBrochure
            dataScience={dataScience}
          />
        </div>
      </Popup>
      <div className={styles.syllabusLeft}>
        <div className={styles.Syllabusbutton}>
          <div>
            <h4>Syllabus</h4>
          </div>
          <div>
            <button className={styles.Button} onClick={popupShow}>
              {" "}
              <AiOutlineDownload className="bIcons" />
              Download Brochure
            </button>
          </div>
        </div>
        <p>
          Skillslash’s best Data Science course comes with a 100% job guarantee.
          Besides, the Data Science and AI courses are curated by leading
          faculties and industry leaders. Especially, with the aim to provide
          practical data science learning experience with live interactive
          classes and projects.
        </p>

        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 0;
                handleChange(id);
              }}
            >
              {state[0].open ? (
                <div className={styles.quesO}>
                  <h2>Module 0 (4 weeks )</h2>

                  <span>
                    {state[0].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>Module 0 (4 weeks )</h2>
                  <span>
                    {state[0].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[0].open ? (
                <div className={styles.ans}>
                  <h5>Programming Fundamentals(2 week )</h5>
                  <li>Programming Basics, Variables, Conditional statements</li>
                  <li>Strings, Lists, Loops and Functions</li>
                  <li>
                    Pointers in C, Revision of C/C++/Java/Javascript and Python
                    Syntax
                  </li>
                  <li>Basic Mathematics for Programming.</li>
                  <h5 style={{ marginTop: "20px" }}>
                    Software Development Essentials (2 week )
                  </h5>
                  <li>Introduction to HTTP, Rest API</li>
                  <li>Basic Linux</li>
                  <li>Version Control - GIT , Github</li>
                  <li>Operating System Basics</li>
                  <li>Database Fundamentals, SQL & No SQL introduction.</li>
                  <li>Networking Basics.</li>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 1;
                handleChange(id);
              }}
            >
              {state[1].open ? (
                <div className={styles.quesO}>
                  <h2>
                    Module 1 : Data Structures and Algorithms ( 12 Weeks )
                  </h2>

                  <span>
                    {state[1].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>
                    Module 1 : Data Structures and Algorithms ( 12 Weeks )
                  </h2>
                  <span>
                    {state[1].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[1].open ? (
                <div className={styles.ans}>
                  <p>
                    This module helps you to master the algorithms and data
                    structures interview in FAANG & top product based MNCs. You
                    will be solving 250+ coding challenges under guidance of
                    expert mentors working in Tier 1 companies like Microsoft,
                    Amazon, Adobe, Facebook, Google etc.
                  </p>

                  <li>Array basics, Problem solving techniques with example</li>
                  <li>Time Complexity & Bit manipulations</li>
                  <li>Sorting, Searching & String Algorithms</li>
                  <li>Linked list</li>
                  <li>Two pointer techniques</li>
                  <li>Stack & Queue - Implementation & Problems.</li>
                  <li>Tree, Trie, Ternary Search tree</li>
                  <li>Recursion & Greedy Algorithms</li>
                  <li>Combinatorial problems with backtracking</li>
                  <li>Hashing</li>
                  <li>Graph Theory</li>
                  <li>Dynamic Programming</li>
                  <h5>Note:</h5>
                  <li>Programming Language Used: C/C++, Java</li>
                  <li>
                    Total Number of problems to be solved in live class: 120+
                  </li>
                  <li>Total coding problems in assignment: 100 </li>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 2;
                handleChange(id);
              }}
            >
              {state[2].open ? (
                <div className={styles.quesO}>
                  <h2>Module 2 : System Design in Depth (6 weeks )</h2>

                  <span>
                    {state[2].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>Module 2 : System Design in Depth (6 weeks )</h2>
                  <span>
                    {state[2].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[2].open ? (
                <div className={styles.ans}>
                  <h5>System Design fundamentals</h5>
                  <li>
                    OOD : Object-oriented analysis and design , Design patterns
                  </li>
                  <li>CAP Theorem in distributed Computer Systems</li>
                  <li>
                    Load balancing - Caching - Distributed And Global Cache
                  </li>
                  <li>CDN, Proxy, Web Socket, Polling</li>
                  <li>
                    Database Indexing, Sharding, Normalization, ACID, SQL vs
                    NoSQL
                  </li>
                  <li>Messaging Queue</li>
                  <li>Multithreading and Synchronization</li>

                  <h5>High Level Design With Projects</h5>
                  <li>Introduction to common MicroService design patterns</li>
                  <li>Microservices & System components in real world</li>
                  <li>
                    Event Driven, Domain Driven, Rest API driven Architectures
                  </li>
                  <li>3 Real time projects</li>
                  <h5>Low Level Design With Projects</h5>
                  <li>OOD and Design Patterns</li>
                  <li>API Design</li>
                  <li>DB Schema Design for NoSQL and SQL</li>
                  <li>Common LLD and API design questions</li>
                  <h5>Mini Projects : </h5>
                  <li>Designing Facebook news feed</li>
                  <li>Designing web crawler</li>
                  <li>Designing Uber Backend</li>
                  <li>Designing youtube</li>
                  <p>
                    <b>Note:</b> For more end to end{" "}
                    <b> Real industry Projects </b> on system design & Full
                    stack , Refer Project Section.
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 3;
                handleChange(id);
              }}
            >
              {state[3].open ? (
                <div className={styles.quesO}>
                  <h2>
                    Module 3: Advance Data Structures & Algorithms (4 Weeks )
                  </h2>

                  <span>
                    {state[3].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>
                    Module 3: Advance Data Structures & Algorithms (4 Weeks )
                  </h2>
                  <span>
                    {state[3].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[3].open ? (
                <div className={styles.ans}>
                  <li>LRU cache Like Problems</li>
                  <li>
                    Advance Tree - Segment tree, Suffix tree, Red black tree,
                    K-D tree{" "}
                  </li>
                  <li>Advance Dynamic Programming</li>
                  <li>CDN, Proxy, Web Socket, Polling</li>

                  <li>
                    Solve 30+ hard level coding interview questions from FAANG
                    companies.
                  </li>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 4;
                handleChange(id);
              }}
            >
              {state[4].open ? (
                <div className={styles.quesO}>
                  <h2>Module 4 : Coding Interview Prep ( 3 week )</h2>

                  <span>
                    {state[4].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>Module 4 : Coding Interview Prep ( 3 week )</h2>
                  <span>
                    {state[4].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[4].open ? (
                <div className={styles.ans}>
                  <li>
                    Build Resume/Linkedin profile to get shortlisted in top tech
                    companies
                  </li>
                  <li>
                    Learn Strategy to defend every single skill in your CV
                  </li>
                  <li>
                    Understand Hiring process for FAANG and product based MNCs
                  </li>
                  <li>Sessions on Company wise interview.</li>
                  <li>Company wise Mock interview from industry expert.</li>
                  <li>Salary negotiations & strategy.</li>
                  <li>
                    Meet your personal mentor and career coach for guidance.
                  </li>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 5;
                handleChange(id);
              }}
            >
              {state[5].open ? (
                <div className={styles.quesO}>
                  <h2>Module 5 : Electives & Specialization </h2>

                  <span>
                    {state[5].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>Module 5 : Electives & Specialization </h2>
                  <span>
                    {state[5].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[5].open ? (
                <div className={styles.ans}>
                  <p>
                    ( You can select any 2 electives based on your career goal &
                    work exp.)
                  </p>
                  <h5>
                    Module 5 - A : Full Stack Specialization With Real Work
                    Experience (15 Weeks)
                  </h5>
                  <h6>Frontend Development </h6>
                  <li>Web development basics - HTML and CSS</li>
                  <li>Bootstrap Basics </li>
                  <li>Introduction to Javascript</li>
                  <li>Introduction to React Ecosystem</li>
                  <li>Modern Javascript For React</li>
                  <li>Advance React </li>
                  <li>Mastering UI & UX</li>
                  <li>Coding Responsive Websites and Webapps</li>
                  <h6>Backend Development</h6>
                  <li>Introduction to MVC</li>
                  <li>Learning Node.js</li>
                  <li>Mongodb for Developers</li>
                  <li>Learning express.js</li>
                  <li>Building Rest API with node.js and express</li>
                  <li>Securing Rest API with node.js</li>
                  <li>Build Microservices architecture with node.js</li>
                  <li>Docker & Kubernetes basics for node.js applications</li>
                  <li>Cloud Deployment using AWS.</li>
                  <h5>
                    Module 5 B: Data Engineering Specialization ( 6 week )
                  </h5>
                  <li> Overview of Data Engineering</li>
                  <li>Advance SQL, NOSQL Database using Mongodb</li>
                  <li>Hadoop Basics</li>
                  <li>Design Data pipeline</li>
                  <li>Data warehousing</li>
                  <li>Apache Spark Fundamentals </li>
                  <li>
                    Core data engineering - Staging, Profiling, cleansing, and
                    migrating data.
                  </li>
                  <li>2 capstone Projects</li>

                  <h5>
                    Module 5 C : Advance AI & ML Specialization ( 10 week )
                  </h5>

                  <li>Probability theory</li>
                  <li>Statistics foundation</li>
                  <li>Exploratory Data Analysis</li>
                  <li>Intro to Machine learning</li>
                  <li>Supervised Learning</li>
                  <li>Unsupervised Learning</li>
                  <li>Deep Learning Basics</li>
                  <li>NLP and Chatbots</li>
                  <li>Basics of Computer Vision</li>
                  <li>2 Capstone Projects</li>

                  <h5>
                    Module 5 D: Technical Engineering Manager ( Recommended for
                    greater 7 Yrs exp ) (8 weeks)
                  </h5>

                  <li>Technical Engineering Management Fundamentals</li>
                  <li>Technical concepts for Engineering managers</li>
                  <li>Digital product lifecycle.</li>
                  <li>Software Development Project management.</li>
                  <li>Building a product roadmap</li>
                  <li>Software Product Development Frameworks</li>
                  <li>Building a product from scratch</li>
                  <li>Building team - Hiring tech talent</li>
                  <li>How to manage tech teams?</li>
                  <li>Launching your Product</li>
                  <li>Product management tips.</li>
                  <li>Behavioral interviews for Engineering managers</li>

                  <h5>Module 5 E : Blockchain Specialization ( 4 weeks )</h5>
                  <li>Blockchain Basics</li>
                  <li>Hyperledger Fundamentals</li>
                  <li>Bitcoin & Blockchain Cryptocurrencies</li>
                  <li>Introduction to Ethereum</li>
                  <li>Smart Contract Basics</li>
                  <li>Hyperledger Fabric Basics</li>
                  <li>
                    Real time use cases of blockchain in : Fintech, Supply
                    chain, Healthcare etc.
                  </li>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className={styles.QOuter}>
          <div className={styles.QInner}>
            <div className={styles.line}>
              <BsFillCircleFill className={styles.bIcons} />
            </div>
            <div
              className={styles.FaqWrapper}
              onClick={() => {
                let id = 6;
                handleChange(id);
              }}
            >
              {state[6].open ? (
                <div className={styles.quesO}>
                  <h2>
                    Module 6 : Work on End to End Projects in Partnership With
                    Startups{" "}
                  </h2>

                  <span>
                    {state[6].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              ) : (
                <div className={styles.ques}>
                  <h2>
                    Module 6 : Work on End to End Projects in Partnership With
                    Startups{" "}
                  </h2>
                  <span>
                    {state[6].open ? (
                      <MdKeyboardArrowUp className="icon" />
                    ) : (
                      <MdKeyboardArrowDown className="icon" />
                    )}
                  </span>
                </div>
              )}

              {state[6].open ? (
                <div className={styles.ans}>
                  We help you to work on projects directly with startups so that
                  you get real work experience. You will be building scalable
                  tech products from scratch using full stack technologies and
                  advanced system design concepts. You are recommended to work
                  on minimum 3-4 projects end to end and build a project
                  portfolio to crack coding interviews in top MNCs with
                  confidence.
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className={styles.white} />
      </div>
      <div className={styles.syllabusRight}>
        <div className={styles.PProgrammain}>
          <div className={styles.PProgram}>
            <p>Program Highlights</p>
          </div>
          <div className={styles.PProgramInner}>
            <p>
              <MdOutlineLiveTv className={styles.PIcons} />
              350+ Live sessions
            </p>
            <p>
              <SiCodeproject className={styles.PIcons} />
              15+ Industry Projects
            </p>
            <p>
              <SiTimescale className={styles.PIcons} />
              Life time accessibility
            </p>
            <p>
              <MdOutlineLaptopMac className={styles.PIcons} />
              Live project experience
            </p>
          </div>
        </div>
        <div className={styles.PProgrammain} style={{ marginTop: "20px" }}>
          <div className={styles.PProgram}>
            <p>Request More Information</p>
          </div>
          <div className={styles.PProgramInner}>
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Syllabus;
