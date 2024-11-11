// import gsap from "gsap";
// import DefaultBlock from "/scripts/default/block";
// import { Observer } from "gsap/all";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(Observer);

alert("hello");
class Showcase {
	init() {
		this.wrapper = this.block.querySelector(".showcase__wrap");
		this.items = this.wrapper.querySelectorAll(".showcase__item");
		this.titles = this.wrapper.querySelectorAll(".showcase__titles p");
		this.titleLinks = this.wrapper.querySelectorAll(".showcase__titles a");
		this.tools = this.wrapper.querySelectorAll(".showcase__tools p");
		this.videos = this.wrapper.querySelectorAll(".showcase__video");
		this.previous = this.block.querySelector(".button.prev");
		this.next = this.block.querySelector(".button.next");

		// this.loopItems = this.loopItems.bind(this);

		// this.loop = this.loopItems();
	}

	initEvents() {
		const movingClass = "is-moving";

		this.previous.addEventListener("click", this.loop.previous);
		this.next.addEventListener("click", this.loop.next);

		Observer.create({
			target: this.wrapper,
			type: "touch,pointer",
			dragMinimum: 10,
			onPress: () => {
				this.wrapper.classList.add(movingClass);
			},
			onRelease: () => {
				this.wrapper.classList.remove(movingClass);
			},
			onLeft: () => {
				this.loop.next();
			},
			onRight: () => {
				this.loop.previous();
			},
		});

		ScrollTrigger.create({
			trigger: this.wrapper,
			start: "top bottom",
			end: "bottom top",
			once: true,
			onEnter: () => {
				this.videos[1].play();
			},
		});
	}

	/* This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

		Features:
		- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
		- When each item animates to the left or right enough, it will loop back to the other side
		- The returned timeline will have the following methods added to it:
			- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
			- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
			- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
			- current() - returns the current index (if an animation is in-progress, it reflects the final index)
			- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 	*/
	// loopItems() {
	// 	const items = gsap.utils.toArray(this.items);

	// 	let tl = gsap.timeline({
	// 		paused: true,
	// 		draggable: true,
	// 		defaults: { ease: "none" },
	// 		onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
	// 	});

	// 	let length = items.length,
	// 		startX = items[0].offsetLeft,
	// 		times = [],
	// 		widths = [],
	// 		xPercents = [],
	// 		curIndex = 0,
	// 		pixelsPerSecond = 1000,
	// 		/* Some browsers shift by a pixel to accommodate flex layouts,
	// 		so for example if width is 20% the first element's width might
	// 		be 242px, and the next 243px, alternating back and forth.
	// 		So we snap to 5 percentage points to make things look more natural */
	// 		snap = gsap.utils.snap(1),
	// 		populateWidths = () =>
	// 			items.forEach((el, i) => {
	// 				widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
	// 				xPercents[i] = snap(
	// 					(parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
	// 						gsap.getProperty(el, "xPercent")
	// 				);
	// 			}),
	// 		getTotalWidth = () =>
	// 			items[length - 1].offsetLeft +
	// 			(xPercents[length - 1] / 100) * widths[length - 1] -
	// 			startX +
	// 			items[length - 1].offsetWidth *
	// 				gsap.getProperty(items[length - 1], "scaleX"),
	// 		totalWidth,
	// 		curX,
	// 		distanceToStart,
	// 		distanceToLoop,
	// 		item,
	// 		i;

	// 	populateWidths();

	// 	/* Reset */
	// 	gsap.set(items, {
	// 		/* Convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster. */
	// 		xPercent: (i) => xPercents[i],
	// 	});
	// 	gsap.set(items, { x: 0 });
	// 	totalWidth = getTotalWidth();

	// 	/* Create the carousel timeline and store the time array */
	// 	for (i = 0; i < length; i++) {
	// 		item = items[i];
	// 		curX = (xPercents[i] / 100) * widths[i];
	// 		distanceToStart = item.offsetLeft + curX - startX;
	// 		distanceToLoop =
	// 			distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
	// 		tl.to(
	// 			item,
	// 			{
	// 				xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
	// 				duration: distanceToLoop / pixelsPerSecond,
	// 			},
	// 			0
	// 		)
	// 			.fromTo(
	// 				item,
	// 				{
	// 					xPercent: snap(
	// 						((curX - distanceToLoop + totalWidth) / widths[i]) * 100
	// 					),
	// 				},
	// 				{
	// 					xPercent: xPercents[i],
	// 					duration:
	// 						(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
	// 					immediateRender: false,
	// 				},
	// 				distanceToLoop / pixelsPerSecond
	// 			)
	// 			.add("label" + i, distanceToStart / pixelsPerSecond);
	// 		times[i] = distanceToStart / pixelsPerSecond;
	// 	}

	// 	/* Set up timeline functions */
	// 	const setActive = (mid) => {
	// 		items.forEach((box) => box.classList.remove("showcase__item--active"));
	// 		this.titles.forEach((title) => title.classList.remove("active"));
	// 		this.titleLinks.forEach((link) => {
	// 			link.setAttribute("tabindex", "-1");
	// 			link.setAttribute("aria-hidden", "true");
	// 		});
	// 		this.tools.forEach((tool) => {
	// 			tool.setAttribute("tabindex", "-1");
	// 			tool.setAttribute("aria-hidden", "true");
	// 		});
	// 		this.tools.forEach((tool) => tool.classList.remove("active"));
	// 		this.videos.forEach((video) => video.pause());

	// 		let wrapper = gsap.utils.wrap(0, items.length);
	// 		items[wrapper(mid)].classList.add("showcase__item--active");
	// 		this.titles[wrapper(mid)].classList.add("active");
	// 		this.titleLinks[wrapper(mid)].removeAttribute("tabindex");
	// 		this.titleLinks[wrapper(mid)].removeAttribute("aria-hidden");
	// 		this.tools[wrapper(mid)].removeAttribute("tabindex");
	// 		this.tools[wrapper(mid)].removeAttribute("aria-hidden");
	// 		this.tools[wrapper(mid)].classList.add("active");
	// 		this.videos[wrapper(mid)].play();
	// 	};

	// 	const toIndex = (index) => {
	// 		const vars = { duration: 0.8, ease: "back.out(.95)" };

	// 		/* Find the shortest direction */
	// 		Math.abs(index - curIndex) > length / 2 &&
	// 			(index += index > curIndex ? -length : length);
	// 		let newIndex = gsap.utils.wrap(0, length, index),
	// 			time = times[newIndex];

	// 		/* This handles the timelines playhead to ensure looping works */
	// 		if (time > tl.time() !== index > curIndex) {
	// 			vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
	// 			time += tl.duration() * (index > curIndex ? 1 : -1);
	// 		}
	// 		curIndex = newIndex;
	// 		vars.overwrite = true;
	// 		return tl.tweenTo(time, vars);
	// 	};

	// 	/* Set timeline functions */
	// 	tl.next = () => {
	// 		if (this.animating) return;
	// 		this.animating = true;
	// 		this.timeout = setTimeout(() => {
	// 			this.animating = false;
	// 		}, 800);
	// 		toIndex(curIndex + 1) && setActive(curIndex + 1);
	// 	};

	// 	tl.previous = () => {
	// 		if (this.animating) return;
	// 		this.animating = true;
	// 		this.timeout = setTimeout(() => {
	// 			this.animating = false;
	// 		}, 800);
	// 		toIndex(curIndex - 1) && setActive(curIndex + 1);
	// 	};

	// 	tl.toIndex = (index) => toIndex(index);

	// 	tl.updateIndex = () =>
	// 		(curIndex = Math.round(tl.progress() * items.length));

	// 	tl.times = times;

	// 	/* pre-render for performance */
	// 	tl.progress(1, true).progress(0, true);

	// 	return tl;
	// }
}
