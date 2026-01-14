
const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');
const profileResults = document.querySelector('.profile-results');

const BASE_URL = 'https://api.github.com';

function handleSearch() {
  const userName = inputSearch.value;
  if (userName) {
    console.log(`O nome de usuário digitado é: ${userName}`);
  } else {
    alert('Por favor, digite um nome de usuário do GitHub.');
  }
}

btnSearch.addEventListener('click', async () => {
    const userName = inputSearch.value;

    if (userName) {

        try {

        const response = await fetch (`${BASE_URL}/users/${userName}`);

        if (!response.ok) {
            alert('Usuário não encontrado. Por favor, verifique o nome de usuário e tente novamente.');
            return;
        }

        const data = await response.json();
        console.log(data)

        profileResults.innerHTML = `
            <div class="profile-card">
                <img src="${data.avatar_url}" alt="Avatar de ${data.login}" class="profile-avatar">
                <div class="profile-info">
                    <h2 class="profile-name">${data.name ? data.name : data.login}</h2>
                    <p class="profile-bio">${data.bio ? data.bio : 'Nenhuma biografia disponível.'}</p>
                    <ul class="profile-stats">
                        <li><strong>Repositórios:</strong> ${data.public_repos}</li>
                        <li><strong>Seguidores:</strong> ${data.followers}</li>
                        <li><strong>Seguindo:</strong> ${data.following}</li>
                    </ul>
                    <a href="${data.html_url}" target="_blank" class="profile-link">Ver Perfil no GitHub</a>
                </div>
            </div>
        `;

        } catch (error) {
            alert('Ocorreu um erro ao buscar o perfil. Por favor, tente novamente mais tarde.');
            console.error('Erro ao buscar o perfil do GitHub:', error);
        }

        } else {
            alert('Por favor, digite um nome de usuário do GitHub.');
        }
});
