export default async function decorate(block) {
  const replContainer = document.createElement('div');
  replContainer.classList.add('repl-container');

  const inputForm = document.createElement('form');
  inputForm.id = 'repl-form';
  inputForm.innerHTML = `
    <label for="repl-input">JS REPL:</label>
    <input type="text" id="repl-input" name="repl-input" size="60" autocomplete="off" />
    <button type="submit">Run</button>
  `;

  const outputArea = document.createElement('pre');
  outputArea.id = 'repl-output';
  outputArea.style.marginTop = '1em';

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = inputForm.querySelector('#repl-input').value;

    // Build a new HTML document with the REPL UI and the user's code in a script tag
    const doc = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>JS REPL</title>
        <style>
          body { font-family: sans-serif; margin: 2em; }
          .repl-container { max-width: 700px; }
          #repl-output { margin-top: 1em; background: #f4f4f4; padding: 1em; }
        </style>
      </head>
      <body>
        <div class="repl-container">
          <form id="repl-form">
            <label for="repl-input">JS REPL:</label>
            <input type="text" id="repl-input" name="repl-input" size="60" autocomplete="off" value="${input.replace(/"/g, '&quot;')}" />
            <button type="submit">Run</button>
          </form>
          <pre id="repl-output"></pre>
        </div>
        <script>
          const form = document.getElementById('repl-form');
          const output = document.getElementById('repl-output');
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            const val = form.querySelector('#repl-input').value;
            // Rebuild the document with the new input
            window.parent.document.write(\`${doc.replace(/\$/g, '\\$')}\`);
          });
          try {
            const result = eval(${JSON.stringify(input)});
            output.textContent = String(result);
          } catch (err) {
            output.textContent = err.toString();
          }
        </script>
      </body>
      </html>
    `;
    document.write(doc);
  });

  replContainer.appendChild(inputForm);
  replContainer.appendChild(outputArea);
  block.append(replContainer);
}
