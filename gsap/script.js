alert("hello");

 class Showcase {
    constructor(block) {
        this.block = block;
        this.wrapper = this.block.querySelector(".showcase__wrap");
        this.items = this.wrapper.querySelectorAll(".showcase__item");
        this.previous = this.block.querySelector(".button.prev");
        this.next = this.block.querySelector(".button.next");
		this.tools = this.wrapper.querySelectorAll(".showcase__tools p");
		this.videos = this.wrapper.querySelectorAll(".showcase__video");
        // this.loopItems = this.loopItems.bind(this);
		// this.loop = this.loopItems();

        this.init();
    }

    init() {
        const movingClass = "is-moving";
        const itemWidth = this.items[0].offsetWidth;
        const wrapperWidth = this.wrapper.offsetWidth;
        let currentPosition = 0;

        this.previous.addEventListener("click", () => {
            // if (currentPosition < 0) {
                currentPosition += itemWidth;
                // console.log("Moving left, new position:", currentPosition);
                gsap.to(this.wrapper, { x: currentPosition, duration: 0.5 });
            // }
        });

        this.next.addEventListener("click", () => {
            // if (currentPosition > -(wrapperWidth - itemWidth * this.items.length)) {
                currentPosition -= itemWidth;
                if (currentPosition < -(itemWidth * (this.items.length - 1))) {
                    currentPosition = 0;
                }
                // console.log("Moving right, new position:", currentPosition);
                gsap.to(this.wrapper, { x: currentPosition, duration: 0.5 });
            // }
        });

        this.items.forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                    const video = item.querySelector("video");
                    video.play();
                    // console.log("Item entered viewport:", item);
                },
                onLeaveBack: () => {
                    const video = item.querySelector("video");
                    video.pause();
                    // console.log("Item entered viewport:", item);
                },
            });
        });
    }

}
// Instantiate Showcase class when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const showcaseBlocks = document.querySelectorAll(".showcase");
    showcaseBlocks.forEach((block) => new Showcase(block));
});
