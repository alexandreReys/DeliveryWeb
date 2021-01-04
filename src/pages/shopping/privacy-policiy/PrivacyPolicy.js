import React from 'react';
import { history } from "routes/history";
import { BsArrowLeft } from "react-icons/bs";

import "./styles.css";

const PrivacyPolicy = () => {
    return (
        <div id="privacyPolicy" className="privacy-policy-container">
            <header
                className="arrow-back"
                onClick={() => {
                    history.goBack();
                }}
            >
                <BsArrowLeft className="arrow-back" />
                <strong>Voltar</strong>
            </header>

            <section className="title">
                <h1><b>
                    Política de Privacidade
                </b></h1>
            </section>

            <section>
                <h3><b>
                    1. OBTENÇÃO E USO DE INFORMAÇÕES PESSOAIS
                </b></h3>

                <p>
                    Esta política se aplica a qualquer usuário dos serviços da Delivery Web e a qualquer pessoa que entre em contato com a Delivery Web ou que envie informações para a Delivery Web. Os dados serão obtidos quando o USUÁRIO:
                </p>
                <p>
                    • Realizar o cadastro em nosso aplicativo ou site
                </p>
                <p>
                    • Solicitar entregas de pedidos (USUÁRIOS)
                </p>
                <p>
                    • Prestar serviços de entrega (ENTREGADORES)
                </p>
                <p>
                    • Entrar em contato por meio dos canais de comunicação disponíveis na plataforma
                </p>
            </section>

            <section>
                <h3><b>
                    2. QUAIS INFORMAÇÕES OBTEMOS
                </b></h3>

                <h5><b>
                    INFORMAÇÕES QUE VOCÊ NOS FORNECE
                </b></h5>

                <p>
                    • Cria ou atualiza sua conta na Delivery Web como: seu nome, número de telefone, CPF, endereço, informações para pagamento.
                </p>
                <p>
                    • Solicita a entrega de produtos através do app da Delivery Web.
                </p>
                <p>
                    • Entra em contato com a Delivery Web, inclusive para suporte ao cliente.
                </p>
                <p>
                    • Habilita recursos que requerem o acesso da Delivery Web ao seu catálogo de contatos.
                </p>

                <h5><b>
                    DADOS DE LOCALIZAÇÃO
                </b></h5>

                <p>
                    • A Delivery Web pode coletar seus dados de localização exatos ou aproximados conforme determinado através de dados como GPS, endereço IP e WiFi.
                </p>
                <p>
                    • Se você é um ENTREGADOR, a Delivery Web coleta dados de localização quando o aplicativo está sendo executado em primeiro plano ou segundo plano no seu aparelho. Essas informações são utilizadas para informar ao USUÁRIO a localização de seu pedido em tempo real.
                </p>
                <p>
                    • Se você for um USUÁRIO, a Delivery Web pode coletar informações de localização quando o aplicativo Delivery Web estiver funcionando em primeiro plano. É possível utilizar a Delivery Web sem permitir que a Delivery Web colete seus dados de localização. No entanto, isso pode afetar as funcionalidades disponíveis no seu aplicativo, por exemplo, se você não permitir que a Delivery Web colete seus dados de localização, você terá que inserir manualmente seu endereço para realizar pedidos através da plataforma.
                </p>


            </section>

            <section>
                <h3><b>
                    3. USO DOS DADOS E INFORMAÇÕES
                </b></h3>

                <h5><b>
                    A Delivery Web USA AS INFORMAÇÕES COLETADAS PARA:
                </b></h5>

                <p>
                    A Delivery Web usa as informações coletadas para fornecer, personalizar, manter e melhorar nossos produtos e serviços. Isso inclui o uso das informações para:
                </p>
                <p>
                    • Possibilitar que entregas sejam realizadas
                </p>
                <p>
                    • Processar ou facilitar pagamentos por esses serviços
                </p>
                <p>
                    • Habilitar recursos que permitem que você compartilhe informações com outras pessoas, como quando indica um amigo para usar a Delivery Web
                </p>
                <p>
                    • Habilitar recursos para personalizar sua conta Delivery Web, como criar marcadores para seus estabelecimentos favoritos
                </p>
                <p>
                    • Executar operações necessárias para prestar nossos serviços, como para solucionar problemas de operação, conduzir análises de dados, testes e pesquisas e monitorar e analisar a utilização e as tendências da atividade
                </p>

            </section>

            <section>
                <h3><b>
                    4. COOKIES E OUTRAS TECNOLOGIAS
                </b></h3>

                <p>
                    O site da Delivery Web, os aplicativos, as mensagens de e-mail e o material publicitário poderão usar "cookies" e outras tecnologias tais como pixel tags e web beacons. Essas tecnologias nos ajudam a entender melhor o comportamento do usuário, nos dizem quais partes de nosso site as pessoas visitaram e facilitam e medem a eficácia da publicidade e das pesquisas na web
                </p>
                <p>
                    A Delivery Web também usa cookies e outras tecnologias para relembrar informações pessoais quando você usa o aplicativo. O nosso objetivo nesses casos é fazer com que a sua experiência no aplicativo seja mais conveniente e personalizada. Por exemplo, saber que alguém usando o seu computador ou dispositivo adquiriu determinado produto nos permite indicar produtos mais relevantes para você no próximo acesso ao aplicativo.
                </p>
                <p>
                    Em algumas de nossas mensagens de e-mail, nós usamos uma "URL click-through" vinculada ao conteúdo do site da Delivery Web. Quando os clientes clicam em uma dessas URLs, os usuários são enviados para um servidor web diferente antes de chegarem à página de destino no nosso site. Nós monitoramos esses dados de click-through para entender o interesse em determinados tópicos e avaliar a eficácia das comunicações com os nossos clientes. Se você preferir não ser monitorado dessa maneira, não clique em texto nem nos links de imagens nas mensagens de e-mail.
                </p>

            </section>

            <section>
                <h3><b>
                    PROTEÇÃO DE INFORMAÇÕES PESSOAIS
                </b></h3>

                <p>
                    O Delivery Web toma precauções, entre elas medidas administrativas, técnicas e físicas, para proteger as suas informações pessoais contra perda, roubo, uso indevido, bem como contra acesso não autorizado, divulgação, alteração e destruição.
                </p>
            </section>

            <section>
                <h3><b>
                    INTEGRIDADE E RETENÇÃO DE INFORMAÇÕES PESSOAIS
                </b></h3>

                <p>
                    A Delivery Web reterá suas informações enquanto sua conta permanecer ativa. A Delivery Web irá excluir ou anonimizar suas informações mediante solicitação exceto se houver uma questão não resolvida relacionada à sua conta, como um crédito pendente em sua conta ou uma reclamação ou disputa não resolvida;
                </p>
            </section>

            <section>
                <h3><b>
                    DÚVIDAS SOBRE PRIVACIDADE
                </b></h3>

                <p>
                    Se você tiver algum questionamento ou dúvida com relação à Política de Privacidade da Delivery Web ou qualquer prática descrita aqui, entre em contato conosco através do email contato@Delivery Web.delivery
                </p>

                <p>
                    A Delivery Web poderá atualizar a sua Política de Privacidade periodicamente. Se fizermos alguma alteração na política em termos materiais, colocaremos um aviso no nosso site, juntamente com a Política de Privacidade atualizada
                </p>
            </section>

            <PageFooter />

        </div>
    );
};

function PageFooter () {
    return (
        <div className="page-footer">
            <a 
                href="#privacyPolicy"
                style={{fontSize: 20, fontWeight: "bold", cursor: "pointer"}}
            >
                Voltar ao topo
            </a>
        </div>
    )
}

export default PrivacyPolicy;