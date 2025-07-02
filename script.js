
   // Variáveis globais
let currentUser = null;
let currentTemplate = 'modern';
let resumeData = {
  basics: {},
  work: [],
  education: [],
  skills: [],
  languages: [],
  courses: []
};
let resumes = [];
let currentSection = 1;
let totalSections = 4;

// Funções de navegação
function showSection(sectionId) {
  // Esconde todas as seções
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'none';
  });
  
  // Mostra a seção solicitada
  document.getElementById(sectionId + 'Section').style.display = 'block';
  
  // Atualiza o menu ativo
  document.querySelectorAll('.menu-link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = document.querySelector(`.menu-link[onclick="showSection('${sectionId}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Fecha o menu em dispositivos móveis
  if (window.innerWidth <= 768) {
    document.querySelector('.sidebar').classList.remove('active');
  }
  
  // Rola para o topo
  window.scrollTo(0, 0);
}

function proximaSecao(atual, proxima) {
  if (validarSecao(atual)) {
    document.getElementById(`section${atual}`).classList.remove('active');
    document.getElementById(`section${proxima}`).classList.add('active');
    document.getElementById(`step${atual}`).classList.remove('active');
    document.getElementById(`step${proxima}`).classList.add('active');
    
    currentSection = proxima;
    atualizarProgresso();
    
    // Rola para o topo da próxima seção
    setTimeout(() => {
      document.getElementById(`section${proxima}`).scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}

function validarSecao(secao) {
  if (secao === 1) {
    const nome = document.getElementById('nome').value;
    const profissao = document.getElementById('profissao').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    
    if (!nome || !profissao || !email || !telefone) {
      alert('Por favor, preencha todos os campos obrigatórios da seção Informações Pessoais');
      return false;
    }
    
    // Salva dados básicos
    resumeData.basics = {
      nome,
      profissao,
      email,
      telefone,
      cidade: document.getElementById('cidade').value,
      linkedin: document.getElementById('linkedin').value,
      sobre: document.getElementById('sobre').value
    };
  }
  
  return true;
}

function atualizarProgresso() {
  const progresso = Math.round((currentSection / totalSections) * 100);
  document.getElementById('progressBar').style.width = `${progresso}%`;
  document.getElementById('progressText').textContent = `${progresso}% completo`;
}

// Funções de formulário
function adicionarExperiencia() {
  const container = document.getElementById('experiencias-container');
  const count = container.children.length + 1;
  
  const div = document.createElement('div');
  div.className = 'experiencia-item';
  div.innerHTML = `
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="cargo${count}">Cargo</label>
          <input type="text" id="cargo${count}" placeholder="Ex: Desenvolvedor Front-end">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="empresa${count}">Empresa</label>
          <input type="text" id="empresa${count}" placeholder="Ex: Google">
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="inicio${count}">Data de início</label>
          <input type="month" id="inicio${count}">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="fim${count}">Data de término</label>
          <input type="month" id="fim${count}">
        </div>
      </div>
    </div>
    
    <div class="form-group">
      <label for="descricao${count}">Descrição das atividades</label>
      <textarea id="descricao${count}" placeholder="Descreva suas responsabilidades e conquistas neste cargo"></textarea>
    </div>
    
    <button type="button" class="btn btn-outline" onclick="removerExperiencia(this)">
      <i class="fas fa-trash btn-icon"></i> Remover experiência
    </button>
  `;
  
  container.appendChild(div);
}

function removerExperiencia(button) {
  if (confirm('Tem certeza que deseja remover esta experiência?')) {
    button.parentElement.remove();
  }
}

function adicionarFormacao() {
  const container = document.getElementById('formacoes-container');
  const count = container.children.length + 1;
  
  const div = document.createElement('div');
  div.className = 'formacao-item';
  div.innerHTML = `
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="curso${count}">Curso</label>
          <input type="text" id="curso${count}" placeholder="Ex: Análise e Desenvolvimento de Sistemas">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="instituicao${count}">Instituição</label>
          <input type="text" id="instituicao${count}" placeholder="Ex: Universidade de São Paulo">
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="inicio-curso${count}">Ano de início</label>
          <input type="number" id="inicio-curso${count}" min="1900" max="2099" step="1" placeholder="Ex: 2018">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="fim-curso${count}">Ano de conclusão</label>
          <input type="number" id="fim-curso${count}" min="1900" max="2099" step="1" placeholder="Ex: 2021">
        </div>
      </div>
    </div>
    
    <button type="button" class="btn btn-outline" onclick="removerFormacao(this)">
      <i class="fas fa-trash btn-icon"></i> Remover formação
    </button>
  `;
  
  container.appendChild(div);
}

function removerFormacao(button) {
  if (confirm('Tem certeza que deseja remover esta formação?')) {
    button.parentElement.remove();
  }
}

function adicionarIdioma() {
  const container = document.getElementById('idiomas-container');
  const count = container.children.length + 1;
  
  const div = document.createElement('div');
  div.className = 'idioma-item';
  div.innerHTML = `
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="idioma${count}">Idioma</label>
          <input type="text" id="idioma${count}" placeholder="Ex: Inglês">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="nivel${count}">Nível</label>
          <select id="nivel${count}">
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Fluente">Fluente</option>
            <option value="Nativo">Nativo</option>
          </select>
        </div>
      </div>
    </div>
    
    <button type="button" class="btn btn-outline" onclick="removerIdioma(this)">
      <i class="fas fa-trash btn-icon"></i> Remover idioma
    </button>
  `;
  
  container.appendChild(div);
}

function removerIdioma(button) {
  if (confirm('Tem certeza que deseja remover este idioma?')) {
    button.parentElement.remove();
  }
}

// Funções de template
function selecionarTemplate(template) {
  currentTemplate = template;
  
  // Remove a seleção de todos os templates
  document.querySelectorAll('.template-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Adiciona seleção ao template clicado
  event.currentTarget.classList.add('selected');
  
  // Atualiza as variáveis CSS com as cores do template
  const root = document.documentElement;
  const colors = getTemplateColors(template);
  
  root.style.setProperty('--primary-color', colors.primary);
  root.style.setProperty('--secondary-color', colors.secondary);
  root.style.setProperty('--accent-color', colors.accent);
}

function getTemplateColors(template) {
  const templates = {
    modern: {
      primary: '#4361ee',
      secondary: '#3f37c9',
      accent: '#4895ef'
    },
    classic: {
      primary: '#2b2d42',
      secondary: '#1a1a2e',
      accent: '#4a4e69'
    },
    creative: {
      primary: '#f72585',
      secondary: '#b5179e',
      accent: '#7209b7'
    },
    professional: {
      primary: '#0077b6',
      secondary: '#023e8a',
      accent: '#0096c7'
    },
    minimalist: {
      primary: '#333',
      secondary: '#222',
      accent: '#555'
    }
  };
  
  return templates[template] || templates.modern;
}

// Funções de geração de currículo
function gerarCurriculo() {
  // Coleta todos os dados do formulário
  coletarDadosFormulario();
  
  // Gera o HTML do currículo
  const htmlCurriculo = gerarHTMLCurriculo();
  
  // Exibe a prévia
  document.getElementById('curriculo').innerHTML = htmlCurriculo;
  document.getElementById('previewContainer').style.display = 'block';
  
  // Rola para a prévia
  setTimeout(() => {
    document.getElementById('previewContainer').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function coletarDadosFormulario() {
  // Limpa arrays
  resumeData.work = [];
  resumeData.education = [];
  resumeData.languages = [];
  
  // Coleta experiências
  const experiencias = document.getElementById('experiencias-container').children;
  for (let i = 0; i < experiencias.length; i++) {
    const exp = experiencias[i];
    resumeData.work.push({
      cargo: exp.querySelector(`#cargo${i+1}`).value,
      empresa: exp.querySelector(`#empresa${i+1}`).value,
      inicio: exp.querySelector(`#inicio${i+1}`).value,
      fim: exp.querySelector(`#fim${i+1}`).value,
      descricao: exp.querySelector(`#descricao${i+1}`).value
    });
  }
  
  // Coleta formações
  const formacoes = document.getElementById('formacoes-container').children;
  for (let i = 0; i < formacoes.length; i++) {
    const form = formacoes[i];
    resumeData.education.push({
      curso: form.querySelector(`#curso${i+1}`).value,
      instituicao: form.querySelector(`#instituicao${i+1}`).value,
      inicio: form.querySelector(`#inicio-curso${i+1}`).value,
      fim: form.querySelector(`#fim-curso${i+1}`).value
    });
  }
  
  // Coleta idiomas
  const idiomas = document.getElementById('idiomas-container').children;
  for (let i = 0; i < idiomas.length; i++) {
    const idiom = idiomas[i];
    resumeData.languages.push({
      idioma: idiom.querySelector(`#idioma${i+1}`).value,
      nivel: idiom.querySelector(`#nivel${i+1}`).value
    });
  }
  
  // Coleta habilidades
  const habilidades = document.getElementById('habilidades').value.split(',').map(h => h.trim()).filter(h => h);
  resumeData.skills = habilidades;
  
  // Coleta cursos
  const cursos = document.getElementById('cursos').value.split('\n').filter(c => c.trim());
  resumeData.courses = cursos;
}

function gerarHTMLCurriculo() {
  const { basics, work, education, skills, languages, courses } = resumeData;
  
  let html = `
    <div class="watermark">${currentUser ? 'Currículo.AI' : 'VISITANTE'}</div>
    <div class="curriculo-header">
      <h1 class="curriculo-name">${basics.nome}</h1>
      <h2 class="curriculo-title">${basics.profissao}</h2>
      
      <div class="curriculo-contact">
        ${basics.email ? `<div class="contact-item"><i class="fas fa-envelope contact-icon"></i>${basics.email}</div>` : ''}
        ${basics.telefone ? `<div class="contact-item"><i class="fas fa-phone contact-icon"></i>${basics.telefone}</div>` : ''}
        ${basics.cidade ? `<div class="contact-item"><i class="fas fa-map-marker-alt contact-icon"></i>${basics.cidade}</div>` : ''}
        ${basics.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin contact-icon"></i>${basics.linkedin.replace('https://', '')}</div>` : ''}
      </div>
    </div>
  `;
  
  // Sobre
  if (basics.sobre) {
    html += `
      <div class="curriculo-section">
        <h3 class="section-title-curriculo">Sobre</h3>
        <div class="section-content">
          <p>${basics.sobre.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `;
  }
  
  // Experiência
  if (work.length > 0) {
    html += `
      <div class="curriculo-section">
        <h3 class="section-title-curriculo">Experiência Profissional</h3>
        <div class="section-content">
    `;
    
    work.forEach(exp => {
      if (exp.cargo) {
        html += `
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-title">${exp.cargo}</div>
              <div class="experience-date">${formatDate(exp.inicio)} - ${exp.fim ? formatDate(exp.fim) : 'Atual'}</div>
            </div>
            <div class="experience-company">${exp.empresa || ''}</div>
            <div class="experience-description">${exp.descricao ? exp.descricao.replace(/\n/g, '<br>') : ''}</div>
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  }
  
  // Formação
  if (education.length > 0) {
    html += `
      <div class="curriculo-section">
        <h3 class="section-title-curriculo">Formação Acadêmica</h3>
        <div class="section-content">
    `;
    
    education.forEach(edu => {
      if (edu.curso) {
        html += `
          <div class="education-item">
            <div class="education-header">
              <div class="education-title">${edu.curso}</div>
              <div class="education-date">${edu.inicio} - ${edu.fim || 'Atual'}</div>
            </div>
            <div class="education-institution">${edu.instituicao || ''}</div>
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  }
  
  // Habilidades
  if (skills.length > 0) {
    html += `
      <div class="curriculo-section">
        <h3 class="section-title-curriculo">Habilidades Técnicas</h3>
        <div class="section-content">
          <div class="skills-container">
    `;
    
    skills.forEach(skill => {
      html += `<span class="skill-tag">${skill}</span>`;
    });
    
    html += `</div></div></div>`;
  }
  
  // Idiomas
  if (languages.length > 0) {
    html += `
      <div class="curriculo-section">
        <h3 class="section-title-curriculo">Idiomas</h3>
        <div class="section-content">
    `;
    
    languages.forEach(lang => {
      if (lang.idioma) {
        html += `
          <div style="margin-bottom: 0.5rem;">
            <strong>${lang.idioma}:</strong> ${lang.nivel}
          </div>
        `;
      }
    });
    
    html += `</div></div>`;
  }
  
  // Cursos
  if (courses.length > 0) {
    html += `
      <div class="curriculo-section">
        <h3 class="section-title-curriculo">Cursos e Certificações</h3>
        <div class="section-content">
          <ul style="padding-left: 1.5rem;">
    `;
    
    courses.forEach(course => {
      html += `<li>${course}</li>`;
    });
    
    html += `</ul></div></div>`;
  }
  
  return html;
}

function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Retorna o original se não for uma data válida
  
  const month = date.toLocaleString('pt-BR', { month: 'short' });
  const year = date.getFullYear();
  
  return `${month} ${year}`;
}

// Funções de PDF
function baixarPDF() {
  const element = document.getElementById('curriculo');
  const opt = {
    margin: 10,
    filename: `Curriculo_${resumeData.basics.nome.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  // Verifica se é usuário premium (sem watermark)
  const isPremium = currentUser && currentUser.premium;
  
  if (!isPremium) {
    const watermark = element.querySelector('.watermark');
    if (watermark) watermark.style.display = 'block';
  }
  
  // Gerar PDF
  html2pdf().set(opt).from(element).save().then(() => {
    // Esconder watermark após gerar PDF
    const watermark = element.querySelector('.watermark');
    if (watermark) watermark.style.display = isPremium ? 'none' : 'block';
    
    if (!isPremium) {
      alert('Versão gratuita inclui marca d\'água. Ative o Premium para remover.');
    }
    
    // Salva o currículo se for usuário logado
    if (currentUser && currentUser.id !== 'guest') {
      salvarCurriculo();
    }
  });
}

function editarCurriculo() {
  document.getElementById('previewContainer').style.display = 'none';
}

// Funções de login
function showLoginModal() {
  // Simula login com Google
  document.getElementById('googleLoginBtn').addEventListener('click', () => {
    login({
      id: 'google123',
      name: 'Usuário Google',
      email: 'usuario@gmail.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      premium: false
    });
  });
  
  // Simula login com Microsoft
  document.getElementById('microsoftLoginBtn').addEventListener('click', () => {
    login({
      id: 'microsoft456',
      name: 'Usuário Microsoft',
      email: 'usuario@outlook.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      premium: false
    });
  });
  
  // Simula login com Apple
  document.getElementById('appleLoginBtn').addEventListener('click', () => {
    login({
      id: 'apple789',
      name: 'Usuário Apple',
      email: 'usuario@icloud.com',
      avatar: 'https://i.pravatar.cc/150?img=7',
      premium: false
    });
  });
}

function login(user) {
  currentUser = user;
  
  // Atualiza UI
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('appContent').style.display = 'block';
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userAvatar').src = user.avatar;
  document.getElementById('loginBtnContainer').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'block';
  
  // Carrega currículos salvos (simulado)
  if (user.id !== 'guest') {
    carregarCurriculosSalvos();
  }
  
  showSection('dashboard');
}

function logout() {
  currentUser = null;
  
  // Atualiza UI
  document.getElementById('appContent').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'flex';
  document.getElementById('userName').textContent = 'Visitante';
  document.getElementById('userEmail').textContent = 'Faça login para salvar';
  document.getElementById('userAvatar').src = 'https://via.placeholder.com/150';
  document.getElementById('loginBtnContainer').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'none';
  
  // Limpa dados temporários
  resumeData = {
    basics: {},
    work: [],
    education: [],
    skills: [],
    languages: [],
    courses: []
  };
}

function continueAsGuest() {
  login({
    id: 'guest',
    name: 'Visitante',
    email: 'Modo visitante - dados locais',
    avatar: 'https://via.placeholder.com/150',
    premium: false
  });
}

// Funções de gerenciamento de currículos
function salvarCurriculo() {
  if (!currentUser || currentUser.id === 'guest') return;
  
  // Cria um novo currículo ou atualiza existente
  const resume = {
    id: Date.now().toString(),
    title: `${resumeData.basics.profissao || 'Currículo'} - ${new Date().toLocaleDateString()}`,
    data: JSON.parse(JSON.stringify(resumeData)),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // Adiciona à lista (simulando banco de dados)
  const existingIndex = resumes.findIndex(r => r.id === resume.id);
  if (existingIndex >= 0) {
    resumes[existingIndex] = resume;
  } else {
    resumes.push(resume);
  }
  
  // Atualiza UI
  atualizarListaCurriculos();
  alert('Currículo salvo com sucesso!');
}

function carregarCurriculosSalvos() {
  // Simula carregamento de currículos salvos
  setTimeout(() => {
    resumes = [
      {
        id: '1',
        title: 'Desenvolvedor Front-end - 15/06/2023',
        data: {
          basics: {
            nome: 'Carlos Silva',
            profissao: 'Desenvolvedor Front-end',
            email: 'carlos@exemplo.com',
            telefone: '(11) 98765-4321',
            cidade: 'São Paulo, SP',
            sobre: 'Desenvolvedor com 5 anos de experiência em React e Vue.js'
          },
          work: [
            {
              cargo: 'Desenvolvedor Front-end',
              empresa: 'Tech Solutions',
              inicio: '2020-01-01',
              fim: '',
              descricao: 'Desenvolvimento de aplicações web com React'
            }
          ],
          education: [
            {
              curso: 'Análise e Desenvolvimento de Sistemas',
              instituicao: 'Universidade São Paulo',
              inicio: '2016',
              fim: '2019'
            }
          ],
          skills: ['JavaScript', 'React', 'Vue.js', 'HTML', 'CSS'],
          languages: [
            {
              idioma: 'Inglês',
              nivel: 'Avançado'
            }
          ],
          courses: [
            'Curso Avançado de React - Alura (2022)',
            'Certificação Scrum Master - Scrum.org (2021)'
          ]
        },
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-06-15')
      }
    ];
    
    atualizarListaCurriculos();
    atualizarEstatisticasDashboard();
  }, 500);
}

function atualizarListaCurriculos() {
  const container = document.getElementById('resumesListContainer');
  
  if (resumes.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #666; margin: 2rem 0;">Você ainda não criou nenhum currículo. Comece agora!</p>';
    return;
  }
  
  let html = '';
  resumes.forEach(resume => {
    html += `
      <div class="resume-item">
        <div class="resume-info">
          <div class="resume-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div>
            <div class="resume-name">${resume.title}</div>
            <div class="resume-date">Atualizado em ${resume.updatedAt.toLocaleDateString()}</div>
          </div>
        </div>
        <div class="resume-actions">
          <button class="action-btn" onclick="editarCurriculoSalvo('${resume.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn" onclick="baixarCurriculoSalvo('${resume.id}')">
            <i class="fas fa-download"></i>
          </button>
          <button class="action-btn" onclick="excluirCurriculo('${resume.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function editarCurriculoSalvo(id) {
  const resume = resumes.find(r => r.id === id);
  if (!resume) return;
  
  // Preenche o formulário com os dados do currículo
  resumeData = JSON.parse(JSON.stringify(resume.data));
  
  // Preenche informações básicas
  document.getElementById('nome').value = resumeData.basics.nome || '';
  document.getElementById('profissao').value = resumeData.basics.profissao || '';
  document.getElementById('email').value = resumeData.basics.email || '';
  document.getElementById('telefone').value = resumeData.basics.telefone || '';
  document.getElementById('cidade').value = resumeData.basics.cidade || '';
  document.getElementById('linkedin').value = resumeData.basics.linkedin || '';
  document.getElementById('sobre').value = resumeData.basics.sobre || '';
  
  // Limpa containers
  document.getElementById('experiencias-container').innerHTML = '';
  document.getElementById('formacoes-container').innerHTML = '';
  document.getElementById('idiomas-container').innerHTML = '';
  
  // Preenche experiências
  resumeData.work.forEach((exp, i) => {
    if (i === 0) {
      document.getElementById('cargo1').value = exp.cargo || '';
      document.getElementById('empresa1').value = exp.empresa || '';
      document.getElementById('inicio1').value = exp.inicio || '';
      document.getElementById('fim1').value = exp.fim || '';
      document.getElementById('descricao1').value = exp.descricao || '';
    } else {
      adicionarExperiencia();
      const container = document.getElementById('experiencias-container');
      const lastExp = container.lastChild;
      
      lastExp.querySelector(`#cargo${i+1}`).value = exp.cargo || '';
      lastExp.querySelector(`#empresa${i+1}`).value = exp.empresa || '';
      lastExp.querySelector(`#inicio${i+1}`).value = exp.inicio || '';
      lastExp.querySelector(`#fim${i+1}`).value = exp.fim || '';
      lastExp.querySelector(`#descricao${i+1}`).value = exp.descricao || '';
    }
  });
  
  // Preenche formações
  resumeData.education.forEach((edu, i) => {
    if (i === 0) {
      document.getElementById('curso1').value = edu.curso || '';
      document.getElementById('instituicao1').value = edu.instituicao || '';
      document.getElementById('inicio-curso1').value = edu.inicio || '';
      document.getElementById('fim-curso1').value = edu.fim || '';
    } else {
      adicionarFormacao();
      const container = document.getElementById('formacoes-container');
      const lastEdu = container.lastChild;
      
      lastEdu.querySelector(`#curso${i+1}`).value = edu.curso || '';
      lastEdu.querySelector(`#instituicao${i+1}`).value = edu.instituicao || '';
      lastEdu.querySelector(`#inicio-curso${i+1}`).value = edu.inicio || '';
      lastEdu.querySelector(`#fim-curso${i+1}`).value = edu.fim || '';
    }
  });
  
  // Preenche idiomas
  resumeData.languages.forEach((lang, i) => {
    if (i === 0) {
      document.getElementById('idioma1').value = lang.idioma || '';
      document.getElementById('nivel1').value = lang.nivel || 'Básico';
    } else {
      adicionarIdioma();
      const container = document.getElementById('idiomas-container');
      const lastLang = container.lastChild;
      
      lastLang.querySelector(`#idioma${i+1}`).value = lang.idioma || '';
      lastLang.querySelector(`#nivel${i+1}`).value = lang.nivel || 'Básico';
    }
  });
  
  // Preenche habilidades e cursos
  document.getElementById('habilidades').value = resumeData.skills.join(', ');
  document.getElementById('cursos').value = resumeData.courses.join('\n');
  
  // Mostra a seção de criação
  showSection('create-resume');
  
  // Atualiza progresso
  currentSection = 1;
  atualizarProgresso();
}

function baixarCurriculoSalvo(id) {
  const resume = resumes.find(r => r.id === id);
  if (!resume) return;
  
  // Preenche os dados temporários
  resumeData = JSON.parse(JSON.stringify(resume.data));
  
  // Gera o HTML
  const htmlCurriculo = gerarHTMLCurriculo();
  document.getElementById('curriculo').innerHTML = htmlCurriculo;
  
  // Baixa o PDF
  setTimeout(() => {
    baixarPDF();
  }, 500);
}

function excluirCurriculo(id) {
  if (confirm('Tem certeza que deseja excluir este currículo? Esta ação não pode ser desfeita.')) {
    resumes = resumes.filter(r => r.id !== id);
    atualizarListaCurriculos();
    atualizarEstatisticasDashboard();
  }
}

// Funções do dashboard
function atualizarEstatisticasDashboard() {
  document.getElementById('resumesCount').textContent = resumes.length;
  document.getElementById('successRate').textContent = resumes.length > 0 ? '85%' : '0%';
  document.getElementById('jobsApplied').textContent = resumes.length > 0 ? '3' : '0';
  document.getElementById('premiumStatus').textContent = currentUser && currentUser.premium ? 'Ativo' : 'Inativo';
}

// Funções de IA
function usarSugestao(campo) {
  const sugestao = document.getElementById(`sugestao-${campo}`).textContent;
  document.getElementById(campo).value = sugestao;
}

function gerarSugestao(campo) {
  // Simula geração de sugestão por IA
  const sugestoes = {
    sobre: [
      "Desenvolvedor front-end com 5 anos de experiência em criação de interfaces responsivas e acessíveis. Apaixonado por UX/UI e sempre buscando aprender novas tecnologias para criar experiências digitais excepcionais.",
      "Profissional de TI com experiência em desenvolvimento web e mobile. Especializado em JavaScript, React e Node.js. Busco oportunidades para aplicar meus conhecimentos em projetos desafiadores.",
      "Engenheiro de software com foco em soluções escaláveis e de alta performance. Experiência em arquitetura de sistemas e liderança técnica. Comprometido com boas práticas e qualidade de código."
    ]
  };
  
  const randomIndex = Math.floor(Math.random() * sugestoes[campo].length);
  document.getElementById(`sugestao-${campo}`).textContent = sugestoes[campo][randomIndex];
}

// Funções de preparação para entrevista
function loadInterviewQuestions(type) {
  const questions = {
    technical: [
      {
        question: "Você pode explicar a diferença entre let, const e var no JavaScript?",
        tips: [
          "Explique o escopo de cada declaração",
          "Mencione hoisting e temporal dead zone",
          "Dê exemplos de quando usar cada um",
          "Relacione com boas práticas modernas"
        ]
      },
      {
        question: "Como você lida com conflitos de merge no Git?",
        tips: [
          "Explique seu processo de resolução de conflitos",
          "Mencione ferramentas que você usa (VSCode, GitKraken, etc)",
          "Destaque a importância da comunicação com a equipe",
          "Mencione estratégias para prevenir conflitos"
        ]
      }
    ],
    behavioral: [
      {
        question: "Descreva uma situação em que você teve que trabalhar com alguém difícil. Como você lidou com isso?",
        tips: [
          "Use o método STAR (Situação, Tarefa, Ação, Resultado)",
          "Mantenha o foco em como você resolveu o problema",
          "Evite falar mal de colegas ou empresas anteriores",
          "Destaque habilidades de comunicação e resolução de conflitos"
        ]
      }
    ]
  };
  
  const container = document.getElementById('interviewQuestionsContainer');
  container.innerHTML = '';
  
  questions[type].forEach((q, i) => {
    container.innerHTML += `
      <div class="question-card">
        <div class="question-text">"${q.question}"</div>
        <div class="answer-area">
          <textarea placeholder="Digite sua resposta aqui..." style="width: 100%; min-height: 100px;"></textarea>
          <button class="btn btn-outline" style="margin-top: 0.5rem;">
            <i class="fas fa-robot"></i> Analisar Resposta
          </button>
        </div>
        <div class="answer-tips">
          <div class="tips-title">
            <i class="fas fa-lightbulb"></i>
            <span>Dicas para responder</span>
          </div>
          <ul class="tips-list">
            ${q.tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  });
  
  container.style.display = 'block';
  showSection('interview-prep');
  
  // Rola para as perguntas
  setTimeout(() => {
    container.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Funções de upload de foto
function previewFile() {
  const file = document.getElementById('fileInput').files[0];
  const preview = document.getElementById('previewImage');
  const reader = new FileReader();
  
  reader.onloadend = function() {
    preview.src = reader.result;
    preview.style.display = 'block';
    document.getElementById('uploadBtn').disabled = false;
  }
  
  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.style.display = 'none';
    document.getElementById('uploadBtn').disabled = true;
  }
}

function uploadPhoto() {
  const preview = document.getElementById('previewImage');
  document.getElementById('userAvatar').src = preview.src;
  
  if (currentUser) {
    currentUser.avatar = preview.src;
  }
  
  closeUploadModal();
  alert('Foto de perfil atualizada com sucesso!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Configuração inicial
  continueAsGuest();
  showSection('dashboard');
  
  // Configura o botão de logout
  document.getElementById('logoutBtn').addEventListener('click', logout);
  
  // Inicializa o gráfico de habilidades
  const ctx = document.getElementById('skillsChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'UX'],
      datasets: [{
        label: 'Suas Habilidades',
        data: [8, 7, 9, 8, 6, 7],
        backgroundColor: 'rgba(72, 149, 239, 0.2)',
        borderColor: 'rgba(72, 149, 239, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(72, 149, 239, 1)'
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 10
        }
      }
    }
  });
  
  // Mascara para telefone
  const telefone = document.getElementById('telefone');
  if (telefone) {
    telefone.addEventListener('input', function(e) {
      const value = e.target.value.replace(/\D/g, '');
      let formattedValue = '';
      
      if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 2);
      }
      if (value.length > 2) {
        formattedValue += ') ' + value.substring(2, 7);
      }
      if (value.length > 7) {
        formattedValue += '-' + value.substring(7, 11);
      }
      
      e.target.value = formattedValue;
    });
  }
  
  // Simula carregamento de currículos para usuário logado
  if (currentUser && currentUser.id !== 'guest') {
    carregarCurriculosSalvos();
  }
});
 function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('active');
}
