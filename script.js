document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title");
  setTimeout(() => {
    title.classList.add("show");
  }, 500);

  // Adding credits animation
  const credits = document.querySelector(".credits");
  setTimeout(() => {
    credits.classList.add("show");
  }, 1000); // Delay the credits animation a little bit after the title

  document.querySelectorAll(".story p").forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("show");
    }, index * 500);
  });

  document.querySelectorAll(".story p").forEach((p) => {
    let text = p.innerHTML;
    p.innerHTML = text
      .split(" ")
      .map((word) => {
        return `<span>${word}</span>`;
      })
      .join(" ");
  });

  const iconContainer = document.querySelector(".icon-container");

  // Function to create icons
  function createIcons(count) {
    const icons = ["favorite", "star", "stylus_note"];
    let positions = []; // Store positions to check for collisions

    // Set minimum and maximum distance between icons
    const minDistance = 8; // Minimum distance in vw or vh
    const maxDistance = 40; // Maximum distance in vw or vh

    const iconCount = count; // Number of icons to create
    const maxRows = Math.ceil(Math.sqrt(iconCount)); // Estimate the max rows to fill space
    const maxColumns = Math.ceil(iconCount / maxRows); // Estimate the max columns to fill space

    for (let i = 0; i < iconCount; i++) {
      let icon = document.createElement("span");
      icon.classList.add("material-symbols-rounded", "icon");
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];

      // Randomize size between 30px and 100px
      let size = Math.random() * 70 + 30;

      // Calculate positions to fill the screen and keep them spread out
      let row = Math.floor(i / maxColumns); // Calculate the row number
      let column = i % maxColumns; // Calculate the column number

      // Organic/random positions resembling a doodle
      let x = (column / maxColumns) * 100 + Math.random() * 10 - 5; // Randomize slightly
      let y = (row / maxRows) * 100 + Math.random() * 10 - 5; // Randomize slightly

      let rotation = Math.random() * 20 - 10; // Random small rotation between -10 and 10 degrees

      // Ensure icons don't overlap by checking the minimum distance
      let overlap = true;
      let attempts = 0;
      while (overlap && attempts < 100) {
        overlap = false;
        for (let pos of positions) {
          let dist = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));

          // Check if the distance between icons is less than the minimum allowed
          if (dist < minDistance + size / 2 + pos.size / 2) {
            overlap = true;
            x = (column / maxColumns) * 100 + Math.random() * 10 - 5; // Randomize x position again if overlap
            y = (row / maxRows) * 100 + Math.random() * 10 - 5; // Randomize y position again if overlap
            attempts++;
            break;
          }
        }
      }

      if (attempts >= 100) {
        console.warn("Max attempts reached for placing icon, skipping.");
      }

      positions.push({ x, y, size }); // Save the icon position and size

      // Apply styles for the icon
      icon.style.fontSize = `${size}px`;
      icon.style.left = `${x}vw`; // Place icon at x position in viewport
      icon.style.top = `${y}vh`; // Place icon at y position in viewport
      icon.style.transform = `rotate(${rotation}deg)`; // Apply rotation

      iconContainer.appendChild(icon); // Append the icon to the container
    }
  }

  createIcons(100); // Create 100 icons (you can change this number)

  // Parallax effect (untouched)
  document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth - 0.5) * 30;
    let y = (event.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector(
      ".container"
    ).style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

    document.querySelectorAll(".icon").forEach((icon, index) => {
      let depth = (index % 5) + 1;
      let rotation = parseInt(icon.style.transform.match(/-?\d+/)) || 0;
      icon.style.transform = `translate(${x / depth}px, ${
        -y / depth
      }px) rotate(${rotation}deg)`;
    });
  });

  document.addEventListener(
    "touchmove",
    (event) => {
      let touch = event.touches[0];
      let x = (touch.clientX / window.innerWidth - 0.5) * 30;
      let y = (touch.clientY / window.innerHeight - 0.5) * 30;
      document.querySelector(
        ".container"
      ).style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

      document.querySelectorAll(".icon").forEach((icon, index) => {
        let depth = (index % 5) + 1;
        let rotation = parseInt(icon.style.transform.match(/-?\d+/)) || 0;
        icon.style.transform = `translate(${x / depth}px, ${
          -y / depth
        }px) rotate(${rotation}deg)`;
      });
    },
    { passive: true }
  );
});
