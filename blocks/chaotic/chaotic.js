export default async function decorate(block) {
  const usp = new URLSearchParams(window.location.search);

  const query = usp.get('q') || '';
  const searchHeader = document.createElement('div');
  searchHeader.classList.add('search-header-container');
  searchHeader.innerHTML = `
    <h2>Search Results</h2>
    <form action="/search" method="get" id="search-form">
      <div class="search-container" >
        <label for="edit-keys">Enter your keywords </label>
        <input type="text" id="search-input" name="q" value="${query}" size="40" maxlength="255">
      </div>
      <input type="submit" value="Search">
    </form>
  `;
  block.append(searchHeader);

  if (query) {
    const displaySearch = document.createElement('p');
    displaySearch.innerHTML = `You searched for: <strong>${query}</strong>`;
    block.append(displaySearch);
  }
}
