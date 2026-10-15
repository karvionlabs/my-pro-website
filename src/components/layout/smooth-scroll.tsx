"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.1,
			easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
			smoothWheel: true,
		});

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	return null;
}
