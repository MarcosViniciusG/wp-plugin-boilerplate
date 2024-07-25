# wp-plugin-boilerplate
Um boilerplate para auxiliar no aprendizado de desenvolvimento de plugins para WordPress.

## Passo-a-Passo para chegar na branch "finalizado"
### Passo 1
O primeiro passo é preparar o ambiente de desenvolvimento. Todas as etapas necessárias estão contidas nessa página:
https://residenciaticbrisa.github.io/T2G8-Plugin-Wordpress/#/preparandoambiente

### Passo 2
Vamos definir a estrutura das nossas pastas e arquivos. Alguns já estão criados, então vamos finalizar o restante para que fique assim: <br>
![alt text](image-1.png)

### Passo 3
Em sequência, vamos definir o cabeçalho do nosso plugin. Lá estará as informações essenciais sobre nosso plugin como nome, versão, autores, descrição, etc. Para uma lista completa de campos disponíveis acesse a página oficial de desenvolvimento de plugins para WordPress: 
https://developer.wordpress.org/plugins/plugin-basics/header-requirements/

O nosso cabeçalho: <br>
```php
<?php
//cronometro.php

/*
Plugin Name: Cronômetro
Description: Um plugin feito para mostrar um cronômetro até a data e hora definida pelo usuário
*/
```

### Passo 4 
Ativaremos o display de erros para facilitar quando tivermos que debugar: <br>
```php
//formulario-cronometro.php

//Display de erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
```

### Passo 5 
Agora, vamos criar um código JS que mude a cor de todas as tags \<body>. Primeiramente, vamos escrever o código no nosso arquivo JS: <br>
```js
//script.js

function mudarCor() {
    // Mudar a cor do body para lightgray
    document.body.style.backgroundColor = 'lightgray';
}

// Ativa a função quando todos os elementos HTML forem carregados
window.onload = function() {
    mudarCor();
}
```

Logo após, vamos fazer com que nosso PHP carregue esse script em todas as páginas do site WordPress e, para isso, vamos criar uma função que carregue nosso script: <br>
```php
//formulario-cronometro.php

// Função para carregar os scripts
function carregar_scripts() {
    wp_enqueue_script('meu-script', plugins_url('/js/script.js', __FILE__));
}
```
e agora vamos fazer que esse script carregue em todas as páginas através de um gancho do WP: <br>
```php
//formulario-cronometro.php

// Gancho para inicializar o script em todas as páginas
add_action('wp_enqueue_scripts', 'carregar_scripts');
```

### Passo 6
Agora que aprendemos como o WP carrega os scripts em suas páginas, vamos começar a implementar nosso cronômetro. Primeiro, devemos criar os elementos HTML: <br>
```html
<!DOCTYPE html>
<html lang="pt-BR">
    <body>
        <h1 id="fc-titulo">Cronômetro para 2030</h1>
        <h2 id="fc-cronometro">Carregando...</h2>
    </body>
</html>
```
Logo após, criaremos uma função JS que atualize nosso cronômetro a cada segundo(os detalhes da implementação não serão explicados, pois não é o foco desse Workshop): <br>
```js
//script.js
function cronometro() {
    let final = new Date("Jan 1, 2030 00:00:00").getTime();

    // Atualiza o cronômetro a cada minuto
        let x = setInterval(function() {

        // Pega o tempo e a data de hoje
        let hoje = new Date().getTime();

        // Encontra a distância entre o hoje e o final 
        let distancia = final - hoje;

        // Cálculos para dias, horas, minutos e segundos
        let dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        let horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Mostra o resultado em um elemento HTML com o Id "cronometro"
        document.getElementById("fc-cronometro").innerHTML = dias + "d " + horas + "h "
        + minutos + "m " + segundos + "s ";

        // Se o cronômetro for finalizado, coloca algum testo no local
        if (distancia < 0) {
            clearInterval(x);
            document.getElementById("fc-cronometro").innerHTML = "FINALIZADO";
        }
    }, 1000);
}

// Ativa as funções quando todos os elementos HTML forem carregados
window.onload = function() {
    mudarCor();
    cronometro();
}
```
Agora, iremos centralizar o texto em nosso arquivo css: <br>
```css
#fc-cronometro, #fc-titulo {
    text-align: center;
}
```
Por fim, vamos carregar todos esses arquivos no PHP usando shortcode, para o usuário do plugin poder decidir onde ele quer que o cronômetro fique em seu site. Para isso, vamos remover o gancho que carrega o script em todas as páginas implementado no passo 5: <br>
```php
//formulario-cronometro.php

- // Gancho para inicializar o script em todas as páginas
- add_action('wp_enqueue_scripts', 'carregar_scripts');
```

Agora, vamos adicionar duas novas funções: uma para carregar o conteúdo HTML e outra para carregar o CSS: <br>
```php
// Função para carregar o HTML
function carregar_html() {
    // Obtém o caminho do arquivo HTML
    $arquivo_html = plugin_dir_path(__FILE__) . 'html/index.html';

    // Retorna o conteúdo do arquivo HTML
    return file_get_contents($arquivo_html);
}

// Função para carregar os estilos
function carregar_estilos() {
    wp_enqueue_style('meu-style', plugins_url('/css/styles.css', __FILE__));
}
```
Finalmente, vamos adicionar uma nova função e um novo gancho para carregar tudo onde quer que o usuário deseje: <br>
```php
function shortcode() {
    // Obtém o conteúdo do arquivo HTML
    $html_content = carregar_html();
    carregar_scripts();
    carregar_estilos();
    
    // Retorna o conteúdo do arquivo HTML
    return $html_content;
}

// Registra o shortcode com o nome 'cronometro'
add_shortcode('cronometro', 'shortcode');
```
Para o usuário implementar