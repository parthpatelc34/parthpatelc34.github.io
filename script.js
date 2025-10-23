// const $lis = document.querySelectorAll(".button")

// $lis.forEach((node) => {
//     node.addEventListener('mousedown', function(event) {
//         const value = node.innerText.trim()
//         const $result = document.querySelector(".viewer")
//         const resultText = $result.innerText.trim()

//         if(resultText == "0" || resultText == "undefined" || resultText == "Infinity") {
//             $result.innerText = ""
//         }

//         if(value == "=") {
//             let solution = eval(resultText)
//             $result.innerText = solution
//             return true
//         }

//         if(value == 'C') {
//             $result.innerText = "0"
//             return true
//         }

//         $result.append(value)
//     })
// })







/* Helper to inject projects later.
Add objects to the array to show real projects.
Each object supports:
{ title, description, link, tags: ["tag1","tag2"] }
*/
const projects = [];

function renderProjects() {
	const grid = document.getElementById("projectGrid");
	if (!grid) return;

	grid.innerHTML = "";
	if (projects.length === 0) return;

	grid.setAttribute("aria-busy", "true");

	for (const p of projects) {
		const card = document.createElement("article");
		card.className = "card";

		const title = document.createElement("h3");
		title.textContent = p.title || "Untitled";

		const desc = document.createElement("p");
		desc.textContent = p.description || "Description coming soon.";

		const meta = document.createElement("div");
		meta.style.marginTop = "8px";

		if (Array.isArray(p.tags) && p.tags.length) {
			const ul = document.createElement("ul");
			ul.className = "pill-list";
			for (const t of p.tags) {
				const li = document.createElement("li");
				li.textContent = t;
				ul.appendChild(li);
			}
			meta.appendChild(ul);
		}

		const actions = document.createElement("div");
		actions.className = "actions";
		actions.style.marginTop = "10px";

		if (p.link) {
			const a = document.createElement("a");
			a.href = p.link;
			a.target = "_blank";
			a.rel = "noopener";
			a.className = "btn";
			a.textContent = "View";
			actions.appendChild(a);
		}

		card.appendChild(title);
		card.appendChild(desc);
		card.appendChild(meta);
		card.appendChild(actions);
		grid.appendChild(card);
	}

	grid.setAttribute("aria-busy", "false");
}

/* Mobile nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
	navToggle.addEventListener("click", () => {
		const isOpen = navMenu.classList.toggle("open");
		navToggle.setAttribute("aria-expanded", String(isOpen));
	});
}

/* Smooth scroll for in page links */
document.addEventListener("click", (e) => {
	const a = e.target.closest('a[href^="#"]');
	if (!a) return;
	const id = a.getAttribute("href").slice(1);
	const target = document.getElementById(id);
	if (target) {
		e.preventDefault();
		target.scrollIntoView({ behavior: "smooth", block: "start" });
		if (navMenu && navMenu.classList.contains("open")) {
			navMenu.classList.remove("open");
			navToggle.setAttribute("aria-expanded", "false");
		}
	}
});

/* Simple contact form validation and fake submit */
const form = document.getElementById("contactForm");
if (form) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const name = document.getElementById("name");
		const email = document.getElementById("email");
		const message = document.getElementById("message");

		const nameError = document.getElementById("nameError");
		const emailError = document.getElementById("emailError");
		const messageError = document.getElementById("messageError");

		let ok = true;

		if (!name.value.trim()) {
			nameError.textContent = "Please enter your name.";
			ok = false;
		} else {
			nameError.textContent = "";
		}

		const emailVal = email.value.trim();
		if (!emailVal) {
			emailError.textContent = "Please enter your email.";
			ok = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
			emailError.textContent = "Please enter a valid email.";
			ok = false;
		} else {
			emailError.textContent = "";
		}

		if (!message.value.trim()) {
			messageError.textContent = "Please enter a message.";
			ok = false;
		} else {
			messageError.textContent = "";
		}

		if (!ok) return;

		alert("Thanks for your message. This demo form did not send an email.");
		form.reset();
	});
}

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) {
	yearEl.textContent = new Date().getFullYear();
}

/* Initial render */
renderProjects();

/* Example to add a project later:
projects.push({
	title: "Project Name",
	description: "Short one line summary of the project.",
	link: "https://example.com",
	tags: ["React", "Node", "Demo"]
});
renderProjects();
*/
