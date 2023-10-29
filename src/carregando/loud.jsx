// Cadastro.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Loud() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Simulando um tempo de carregamento com setTimeout
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // Altere o tempo para o valor desejado em milissegundos (aqui definido como 3 segundos)

        // Limpando o timeout quando o componente é desmontado
        return () => clearTimeout(loadingTimeout);
    }, []);

    // Se isLoading for verdadeiro, mostra a tela de loading
    if (isLoading) {
        return (
            <div>
                <p>
                    Carregando...
                </p>
            </div>
        );
    }

    // Quando isLoading for falso, redireciona para a página de login
    navigate("/login");

    return null; // Retorna null ou qualquer outra coisa, já que o redirecionamento aconteceu
}

export default Loud;
