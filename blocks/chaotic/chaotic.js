export default async function decorate(block) {
  block.innerHTML = `
    <form id="repl-form">
      <input id="repl-input" type="text" placeholder="Enter JS code" autocomplete="off" style="width:80%;" />
      <button type="submit">Run</button>
    </form>
    <pre id="repl-output"></pre>
  `;

  const input = block.querySelector('#repl-input');
  const output = block.querySelector('#repl-output');
  const form = block.querySelector('#repl-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    output.textContent = '';
    const userCode = input.value;
    const originalLog = console.log;
    console.log = (...args) => { output.textContent += args.join(' ') + '\n'; };
    const script = document.createElement('script');
    script.textContent = userCode;
    document.body.appendChild(script);
    document.body.removeChild(script);
    console.log = originalLog;
  });
}
