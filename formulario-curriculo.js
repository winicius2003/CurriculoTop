// Função principal para abrir o formulário
function abrirFormularioCurriculo() {
  // 1. Esconde todas as seções
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'none';
  });
  
  // 2. Mostra a seção do formulário
  const formularioSection = document.getElementById('createResumeSection');
  if (formularioSection) {
    formularioSection.style.display = 'block';
    
    // 3. Reseta o formulário para o estado inicial
    resetarFormulario();
    
    // 4. Atualiza o menu ativo
    document.querySelectorAll('.menu-link').forEach(link => {
      link.classList.remove('active');
    });
    document.getElementById('abrir-formulario-curriculo').classList.add('active');
    
    // 5. Rola para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    console.log('Formulário aberto com sucesso!');
  } else {
    console.error('Seção do formulário não encontrada!');
  }
}

// Função para resetar o formulário
function resetarFormulario() {
  // 1. Volta para a primeira seção
  currentSection = 1;
  atualizarProgresso();
  
  // 2. Mostra apenas a primeira seção do formulário
  document.querySelectorAll('.form-section').forEach(section => {
    section.classList.remove('active');
  });
  const primeiraSecao = document.getElementById('section1');
  if (primeiraSecao) primeiraSecao.classList.add('active');
  
  // 3. Atualiza os steps de progresso
  document.querySelectorAll('.step').forEach(step => {
    step.classList.remove('active');
  });
  const primeiroStep = document.getElementById('step1');
  if (primeiroStep) primeiroStep.classList.add('active');
  
  // 4. Esconde a prévia se estiver visível
  const previewContainer = document.getElementById('previewContainer');
  if (previewContainer) previewContainer.style.display = 'none';
  
  // 5. Reseta o scroll do formulário
  const formContainer = document.querySelector('#createResumeSection .form-container');
  if (formContainer) formContainer.scrollTop = 0;
}

// Configura o evento de clique no menu
document.addEventListener('DOMContentLoaded', function() {
  const btnAbrirFormulario = document.getElementById('abrir-formulario-curriculo');
  
  if (btnAbrirFormulario) {
    btnAbrirFormulario.addEventListener('click', function(e) {
      e.preventDefault();
      abrirFormularioCurriculo();
    });
  }
  
  // Inicializa o formulário
  initFormularioCurriculo();
});
function validarSecao(secao) {
  let valido = true;
  const mensagens = [];
  
  switch(secao) {
    case 1:
      if (!document.getElementById('nome').value.trim()) {
        mensagens.push('O campo Nome completo é obrigatório');
      }
      if (!document.getElementById('profissao').value.trim()) {
        mensagens.push('O campo Profissão/Cargo é obrigatório');
      }
      if (!document.getElementById('email').value.trim()) {
        mensagens.push('O campo E-mail é obrigatório');
      }
      if (!document.getElementById('telefone').value.trim()) {
        mensagens.push('O campo Telefone é obrigatório');
      }
      break;
      
    case 2:
      // Validação para seção de experiências
      break;
      
    // Adicione validações para outras seções conforme necessário
  }
  
  if (mensagens.length > 0) {
    alert('Por favor, corrija os seguintes erros:\n\n' + mensagens.join('\n'));
    valido = false;
    
    // Rola para o primeiro erro
    setTimeout(() => {
      const primeiroCampoInvalido = document.querySelector('input:invalid, textarea:invalid');
      if (primeiroCampoInvalido) {
        primeiroCampoInvalido.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        primeiroCampoInvalido.focus();
      }
    }, 100);
  }
  
  return valido;
}
  document.querySelectorAll('.btn-proximo').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = btn.getAttribute('data-current');
      const next = btn.getAttribute('data-next');

      const currentSection = document.getElementById(`section${current}`);
      const nextSection = document.getElementById(`section${next}`);

      if (currentSection && nextSection) {
        currentSection.style.display = 'none';
        nextSection.style.display = 'block';
      }
    });
  });
  document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = btn.getAttribute('data-current');
      const previous = btn.getAttribute('data-previous');

      const currentSection = document.getElementById(`section${current}`);
      const previousSection = document.getElementById(`section${previous}`);

      if (currentSection && previousSection) {
        currentSection.style.display = 'none';
        previousSection.style.display = 'block';
      }
    });
  });
    function proximaSecao(atual, proxima) {
    const secaoAtual = document.getElementById(`section${atual}`);
    const secaoDestino = document.getElementById(`section${proxima}`);

    if (secaoAtual && secaoDestino) {
      secaoAtual.style.display = 'none';
      secaoDestino.style.display = 'block';
    }
  }