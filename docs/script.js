class TrackerComponent extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const component = document.createElement('DIV');

        component.innerHTML = `    <link rel="stylesheet" href="styles.css">
        <div class="image-container">
        <slot name="category-image"></slot>
        <div class="tracker-container">
            <slot name='category'></slot>
            <div class="three-dots"><img slot="three-dots" src="https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/3723d6b629bdf201518dda2190acc49541f1c941/images/icon-ellipsis.svg" alt=""></div>
            <slot name="hour-log"></slot>
            <slot name="last-log"></slot>
        </div>
    </div>`

        const style = document.createElement('style');

        style.innerText = `*{
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            --blue: hsl(246, 80%, 60%);
            --light-red: hsl(15, 100%, 70%);
            --soft-blue-play: hsl(195, 74%, 62%);
            --light-red-study: hsl(348, 100%, 68%);
            --lime-green-exercise: hsl(145, 58%, 55%);
            --violet-social: hsl(264, 64%, 52%);
            --orange-self-care: hsl(43, 84%, 65%);
            --very-dark-blue: hsl(226, 43%, 10%);
            --dark-blue: hsl(235, 46%, 20%);
            --desaturated-blue: hsl(235, 45%, 61%);
            --pale-blue: hsl(236, 100%, 87%);
            font-size: 18px;
            font-family: 'Rubik', sans-serif;
        }
        
        body{
            background-color: black;
        }
        
        .component-wrapper{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
            padding: .75em;
            width: 350px;
        }
        
        .tracker-container{
            background-color: var(--dark-blue);
            color: white;
            border-radius: 20px;
            bottom: 0;
            height: 75%;
            width: 100%;
            padding: 1em;
            position: absolute;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }
        
        .category{
            display: grid;
            text-align: left;
            font-weight: 400;
        }
        
        .three-dots{
            justify-self: right;
            top: 0;
        }
        
        .hour-log{
            font-weight: 300;
            font-size: 3em;
            grid-column: 1/3;
        }
        
        .last-log{
            color: var(--pale-blue);
            align-self: end;
        }
        
        .image-container{
            background-color: var(--light-red);
            border-radius: 20px;
            width:100%; 
            min-height: 200px;
            position: relative;
            white-space: nowrap;
            overflow: hidden;
        }
        
        .category-image{
            top: -5px;
            right:20px;
            width: 60px;
            bottom: 0;
            position: absolute;
        }`

        shadow.appendChild(style);
        shadow.appendChild(component);
    }

    connectedCallback(){
    }

}

class TrackerBuilderDaily extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const data = this.parserMethod();
        const categoryNames = data[0];
        const categoryTimestamps = data[1];
        const categoryImagesURL = data[2];

        const documentFragment = document.createDocumentFragment();

        let trackerProfile = document.createElement('tracker-profile');
        trackerProfile.setAttribute('class', 'first-card')

        trackerProfile.innerHTML = `<h2 slot="name" class="name-text">Jeremy Robson</h2>`

        documentFragment.appendChild(trackerProfile);

        for(let i=0; i<categoryNames.length; i++){
          let trackerComponent = document.createElement('tracker-component');

          trackerComponent.innerHTML = `                    <link rel="stylesheet" href="styles.css">
          <div slot="image-container" class="image-container" style="background-color: var(--light-red);"></div>
          <img slot="category-image" class="category-image" src=${categoryImagesURL[i]} alt="">
          <h2 slot="category" class="category">${categoryNames[i]}</h2>
          <p slot="hour-log" class="hour-log">${categoryTimestamps[i].daily.current}hs</p>
          <p slot="last-log" class="last-log">Yesterday - ${categoryTimestamps[i].daily.previous}hs</p>`

          documentFragment.appendChild(trackerComponent);
        }

        shadow.appendChild(documentFragment);

    }

    connectedCallback(){
    }

    parserMethod = () => {
        const trackerData = `[
            {
              "title": "Work",
              "timeframes": {
                "daily": {
                  "current": 5,
                  "previous": 7
                },
                "weekly": {
                  "current": 32,
                  "previous": 36
                },
                "monthly": {
                  "current": 103,
                  "previous": 128
                }
              }
            },
            {
              "title": "Play",
              "timeframes": {
                "daily": {
                  "current": 1,
                  "previous": 2
                },
                "weekly": {
                  "current": 10,
                  "previous": 8
                },
                "monthly": {
                  "current": 23,
                  "previous": 29
                }
              }
            },
            {
              "title": "Study",
              "timeframes": {
                "daily": {
                  "current": 0,
                  "previous": 1
                },
                "weekly": {
                  "current": 4,
                  "previous": 7
                },
                "monthly": {
                  "current": 13,
                  "previous": 19
                }
              }
            },
            {
              "title": "Exercise",
              "timeframes": {
                "daily": {
                  "current": 1,
                  "previous": 1
                },
                "weekly": {
                  "current": 4,
                  "previous": 5
                },
                "monthly": {
                  "current": 11,
                  "previous": 18
                }
              }
            },
            {
              "title": "Social",
              "timeframes": {
                "daily": {
                  "current": 1,
                  "previous": 3
                },
                "weekly": {
                  "current": 5,
                  "previous": 10
                },
                "monthly": {
                  "current": 21,
                  "previous": 23
                }
              }
            },
            {
              "title": "Self Care",
              "timeframes": {
                "daily": {
                  "current": 0,
                  "previous": 1
                },
                "weekly": {
                  "current": 2,
                  "previous": 2
                },
                "monthly": {
                  "current": 7,
                  "previous": 11
                }
              }
            }
          ]`

          const imageArray = ["https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-work.svg",
                              "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-play.svg",
                              "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-study.svg",
                              "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-exercise.svg",
                              "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-social.svg",
                              "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-self-care.svg"
        ];
        
        const data = JSON.parse(trackerData);
        let titlesArray = [];
        let dataArray = [];
        for(let i=0;i<data.length;i++){
            titlesArray.push(data[i].title);
            dataArray.push(data[i].timeframes);
        }
        let returnObject = [titlesArray, dataArray, imageArray];
        return returnObject;
    }
}

class TrackerBuilderWeekly extends HTMLElement{
  constructor(){
      super();
      const shadow = this.attachShadow({mode: 'open'});
      const data = this.parserMethod();
      const categoryNames = data[0];
      const categoryTimestamps = data[1];
      const categoryImagesURL = data[2];

      const documentFragment = document.createDocumentFragment();

      for(let i=0; i<categoryNames.length; i++){
        let trackerComponent = document.createElement('tracker-component');

        trackerComponent.innerHTML = `                    <link rel="stylesheet" href="styles.css">
        <div slot="image-container" class="image-container" style="background-color: var(--light-red);"></div>
        <img slot="category-image" class="category-image" src=${categoryImagesURL[i]} alt="">
        <h2 slot="category" class="category">${categoryNames[i]}</h2>
        <p slot="hour-log" class="hour-log">${categoryTimestamps[i].weekly.current}hs</p>
        <p slot="last-log" class="last-log">Last Week - ${categoryTimestamps[i].weekly.previous}hs</p>`

        documentFragment.appendChild(trackerComponent);
      }

      shadow.appendChild(documentFragment);

  }

  connectedCallback(){
  }

  parserMethod = () => {
      const trackerData = `[
          {
            "title": "Work",
            "timeframes": {
              "daily": {
                "current": 5,
                "previous": 7
              },
              "weekly": {
                "current": 32,
                "previous": 36
              },
              "monthly": {
                "current": 103,
                "previous": 128
              }
            }
          },
          {
            "title": "Play",
            "timeframes": {
              "daily": {
                "current": 1,
                "previous": 2
              },
              "weekly": {
                "current": 10,
                "previous": 8
              },
              "monthly": {
                "current": 23,
                "previous": 29
              }
            }
          },
          {
            "title": "Study",
            "timeframes": {
              "daily": {
                "current": 0,
                "previous": 1
              },
              "weekly": {
                "current": 4,
                "previous": 7
              },
              "monthly": {
                "current": 13,
                "previous": 19
              }
            }
          },
          {
            "title": "Exercise",
            "timeframes": {
              "daily": {
                "current": 1,
                "previous": 1
              },
              "weekly": {
                "current": 4,
                "previous": 5
              },
              "monthly": {
                "current": 11,
                "previous": 18
              }
            }
          },
          {
            "title": "Social",
            "timeframes": {
              "daily": {
                "current": 1,
                "previous": 3
              },
              "weekly": {
                "current": 5,
                "previous": 10
              },
              "monthly": {
                "current": 21,
                "previous": 23
              }
            }
          },
          {
            "title": "Self Care",
            "timeframes": {
              "daily": {
                "current": 0,
                "previous": 1
              },
              "weekly": {
                "current": 2,
                "previous": 2
              },
              "monthly": {
                "current": 7,
                "previous": 11
              }
            }
          }
        ]`

        const imageArray = ["https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-work.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-play.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-study.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-exercise.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-social.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-self-care.svg"
      ];
      
      const data = JSON.parse(trackerData);
      let titlesArray = [];
      let dataArray = [];
      for(let i=0;i<data.length;i++){
          titlesArray.push(data[i].title);
          dataArray.push(data[i].timeframes);
      }
      let returnObject = [titlesArray, dataArray, imageArray];
      return returnObject;
  }
}

class TrackerBuilderMonthly extends HTMLElement{
  constructor(){
      super();
      const shadow = this.attachShadow({mode: 'open'});
      const data = this.parserMethod();
      const categoryNames = data[0];
      const categoryTimestamps = data[1];
      const categoryImagesURL = data[2];

      const documentFragment = document.createDocumentFragment();

      for(let i=0; i<categoryNames.length; i++){
        let trackerComponent = document.createElement('tracker-component');

        trackerComponent.innerHTML = `                    <link rel="stylesheet" href="styles.css">
        <div slot="image-container" class="image-container" style="background-color: var(--light-red);"></div>
        <img slot="category-image" class="category-image" src=${categoryImagesURL[i]} alt="">
        <h2 slot="category" class="category">${categoryNames[i]}</h2>
        <p slot="hour-log" class="hour-log">${categoryTimestamps[i].monthly.current}hs</p>
        <p slot="last-log" class="last-log">Last Month - ${categoryTimestamps[i].monthly.previous}hs</p>`

        documentFragment.appendChild(trackerComponent);
      }

      shadow.appendChild(documentFragment);

  }

  connectedCallback(){
  }

  parserMethod = () => {
      const trackerData = `[
          {
            "title": "Work",
            "timeframes": {
              "daily": {
                "current": 5,
                "previous": 7
              },
              "weekly": {
                "current": 32,
                "previous": 36
              },
              "monthly": {
                "current": 103,
                "previous": 128
              }
            }
          },
          {
            "title": "Play",
            "timeframes": {
              "daily": {
                "current": 1,
                "previous": 2
              },
              "weekly": {
                "current": 10,
                "previous": 8
              },
              "monthly": {
                "current": 23,
                "previous": 29
              }
            }
          },
          {
            "title": "Study",
            "timeframes": {
              "daily": {
                "current": 0,
                "previous": 1
              },
              "weekly": {
                "current": 4,
                "previous": 7
              },
              "monthly": {
                "current": 13,
                "previous": 19
              }
            }
          },
          {
            "title": "Exercise",
            "timeframes": {
              "daily": {
                "current": 1,
                "previous": 1
              },
              "weekly": {
                "current": 4,
                "previous": 5
              },
              "monthly": {
                "current": 11,
                "previous": 18
              }
            }
          },
          {
            "title": "Social",
            "timeframes": {
              "daily": {
                "current": 1,
                "previous": 3
              },
              "weekly": {
                "current": 5,
                "previous": 10
              },
              "monthly": {
                "current": 21,
                "previous": 23
              }
            }
          },
          {
            "title": "Self Care",
            "timeframes": {
              "daily": {
                "current": 0,
                "previous": 1
              },
              "weekly": {
                "current": 2,
                "previous": 2
              },
              "monthly": {
                "current": 7,
                "previous": 11
              }
            }
          }
        ]`

        const imageArray = ["https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-work.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-play.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-study.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-exercise.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-social.svg",
                            "https://raw.githubusercontent.com/lautaroDeLuca/TimeTrackingDashboard/f4df73b2ae4f5e9bf760590e1ad252b8d5cf9723/images/icon-self-care.svg"
      ];
      
      const data = JSON.parse(trackerData);
      let titlesArray = [];
      let dataArray = [];
      for(let i=0;i<data.length;i++){
          titlesArray.push(data[i].title);
          dataArray.push(data[i].timeframes);
      }
      let returnObject = [titlesArray, dataArray, imageArray];
      return returnObject;
  }
}

class TrackerProfile extends HTMLElement{
  constructor(){
      super();
      const shadow = this.attachShadow({mode: 'open'});

      const wrapper = document.createElement('DIV');
      wrapper.setAttribute('class', 'card-wrapper');

      wrapper.innerHTML = `                <link rel="stylesheet" href="styles.css">
      <div class="profile">
      <img class="guy-pic" src="https://github.com/lautaroDeLuca/TimeTrackingDashboard/blob/master/images/image-jeremy.png?raw=true" alt="">
      <p class="report-text">Report for</p>
      <slot name="name"></slot>                    
  </div>
  <div class="selector">
      <ul class="period-list">
          <li class="time-period">Daily</li>
          <li class="time-period">Weekly</li>
          <li class="time-period">Monthly</li>
      </ul>
  </div>`

  shadow.appendChild(wrapper);
      
  }

}


window.customElements.define("tracker-builder-daily", TrackerBuilderDaily);
window.customElements.define("tracker-builder-monthly", TrackerBuilderMonthly);
window.customElements.define("tracker-builder-weekly", TrackerBuilderWeekly);
window.customElements.define("tracker-component", TrackerComponent);
window.customElements.define("tracker-profile", TrackerProfile);
