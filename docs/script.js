class TrackerComponent extends HTMLElement {
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});

        const component = document.createElement('DIV');

        component.innerHTML = `    <div class="image-container">
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

window.customElements.define("tracker-component", TrackerComponent);