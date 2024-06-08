--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

-- Started on 2024-05-27 11:05:59 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 52436)
-- Name: animais_resgatados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.animais_resgatados (
    animal_id integer NOT NULL,
    porte character varying(20),
    cor character varying(50),
    sexo character(1),
    castrado boolean,
    peso numeric(5,2),
    data_resgate date,
    CONSTRAINT animais_resgatados_sexo_check CHECK ((sexo = ANY (ARRAY['M'::bpchar, 'F'::bpchar])))
);


ALTER TABLE public.animais_resgatados OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 52435)
-- Name: animais_resgatados_animal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.animais_resgatados_animal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.animais_resgatados_animal_id_seq OWNER TO postgres;

--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 223
-- Name: animais_resgatados_animal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.animais_resgatados_animal_id_seq OWNED BY public.animais_resgatados.animal_id;


--
-- TOC entry 214 (class 1259 OID 52367)
-- Name: doacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doacoes (
    doacao_id integer NOT NULL,
    doador_id integer,
    tipo_id integer,
    quantidade integer NOT NULL,
    data_doacao date NOT NULL
);


ALTER TABLE public.doacoes OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 52366)
-- Name: doacoes_doacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doacoes_doacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doacoes_doacao_id_seq OWNER TO postgres;

--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 213
-- Name: doacoes_doacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doacoes_doacao_id_seq OWNED BY public.doacoes.doacao_id;


--
-- TOC entry 210 (class 1259 OID 52351)
-- Name: doadores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doadores (
    doador_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    telefone character varying(20),
    endereco text,
    email character varying(100)
);


ALTER TABLE public.doadores OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 52350)
-- Name: doadores_doador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doadores_doador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doadores_doador_id_seq OWNER TO postgres;

--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 209
-- Name: doadores_doador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doadores_doador_id_seq OWNED BY public.doadores.doador_id;


--
-- TOC entry 222 (class 1259 OID 52419)
-- Name: estoques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estoques (
    estoque_id integer NOT NULL,
    ponto_id integer,
    tipo_id integer,
    quantidade integer NOT NULL
);


ALTER TABLE public.estoques OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 52418)
-- Name: estoques_estoque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estoques_estoque_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estoques_estoque_id_seq OWNER TO postgres;

--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 221
-- Name: estoques_estoque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estoques_estoque_id_seq OWNED BY public.estoques.estoque_id;


--
-- TOC entry 218 (class 1259 OID 52393)
-- Name: necessidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.necessidades (
    necessidade_id integer NOT NULL,
    solicitante_id integer,
    tipo_id integer,
    quantidade integer NOT NULL
);


ALTER TABLE public.necessidades OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 52392)
-- Name: necessidades_necessidade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.necessidades_necessidade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.necessidades_necessidade_id_seq OWNER TO postgres;

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 217
-- Name: necessidades_necessidade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.necessidades_necessidade_id_seq OWNED BY public.necessidades.necessidade_id;


--
-- TOC entry 220 (class 1259 OID 52410)
-- Name: pontos_coleta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pontos_coleta (
    ponto_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    endereco text,
    telefone character varying(20)
);


ALTER TABLE public.pontos_coleta OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 52409)
-- Name: pontos_coleta_ponto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pontos_coleta_ponto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pontos_coleta_ponto_id_seq OWNER TO postgres;

--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 219
-- Name: pontos_coleta_ponto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pontos_coleta_ponto_id_seq OWNED BY public.pontos_coleta.ponto_id;


--
-- TOC entry 216 (class 1259 OID 52384)
-- Name: solicitantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitantes (
    solicitante_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    telefone character varying(20),
    endereco text,
    email character varying(100)
);


ALTER TABLE public.solicitantes OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 52383)
-- Name: solicitantes_solicitante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitantes_solicitante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitantes_solicitante_id_seq OWNER TO postgres;

--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 215
-- Name: solicitantes_solicitante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitantes_solicitante_id_seq OWNED BY public.solicitantes.solicitante_id;


--
-- TOC entry 212 (class 1259 OID 52360)
-- Name: tipos_doacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipos_doacao (
    tipo_id integer NOT NULL,
    descricao character varying(50) NOT NULL
);


ALTER TABLE public.tipos_doacao OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 52359)
-- Name: tipos_doacao_tipo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipos_doacao_tipo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipos_doacao_tipo_id_seq OWNER TO postgres;

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 211
-- Name: tipos_doacao_tipo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipos_doacao_tipo_id_seq OWNED BY public.tipos_doacao.tipo_id;


--
-- TOC entry 3249 (class 2604 OID 52439)
-- Name: animais_resgatados animal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animais_resgatados ALTER COLUMN animal_id SET DEFAULT nextval('public.animais_resgatados_animal_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 52370)
-- Name: doacoes doacao_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doacoes ALTER COLUMN doacao_id SET DEFAULT nextval('public.doacoes_doacao_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 52354)
-- Name: doadores doador_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doadores ALTER COLUMN doador_id SET DEFAULT nextval('public.doadores_doador_id_seq'::regclass);


--
-- TOC entry 3248 (class 2604 OID 52422)
-- Name: estoques estoque_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoques ALTER COLUMN estoque_id SET DEFAULT nextval('public.estoques_estoque_id_seq'::regclass);


--
-- TOC entry 3246 (class 2604 OID 52396)
-- Name: necessidades necessidade_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.necessidades ALTER COLUMN necessidade_id SET DEFAULT nextval('public.necessidades_necessidade_id_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 52413)
-- Name: pontos_coleta ponto_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pontos_coleta ALTER COLUMN ponto_id SET DEFAULT nextval('public.pontos_coleta_ponto_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 52387)
-- Name: solicitantes solicitante_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitantes ALTER COLUMN solicitante_id SET DEFAULT nextval('public.solicitantes_solicitante_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 52363)
-- Name: tipos_doacao tipo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_doacao ALTER COLUMN tipo_id SET DEFAULT nextval('public.tipos_doacao_tipo_id_seq'::regclass);


--
-- TOC entry 3427 (class 0 OID 52436)
-- Dependencies: 224
-- Data for Name: animais_resgatados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animais_resgatados (animal_id, porte, cor, sexo, castrado, peso, data_resgate) FROM stdin;
1	Grande	Preto	M	t	25.00	2024-05-01
2	Médio	Branco	F	f	15.00	2024-05-02
3	Pequeno	Marrom	M	t	10.00	2024-05-03
4	Grande	Cinza	F	f	30.00	2024-05-04
5	Médio	Amarelo	M	t	20.00	2024-05-05
6	Pequeno	Preto e Branco	F	t	8.50	2024-05-06
7	Médio	Marrom e Branco	M	f	12.00	2024-05-07
8	Grande	Preto	F	t	25.00	2024-05-08
9	Pequeno	Cinza	M	f	9.00	2024-05-09
10	Médio	Branco	F	t	18.50	2024-05-10
\.


--
-- TOC entry 3417 (class 0 OID 52367)
-- Dependencies: 214
-- Data for Name: doacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doacoes (doacao_id, doador_id, tipo_id, quantidade, data_doacao) FROM stdin;
1	1	1	50	2024-05-01
2	2	2	100	2024-05-02
3	3	3	200	2024-05-03
4	1	4	30	2024-05-04
5	2	5	60	2024-05-05
6	3	6	80	2024-05-06
7	4	1	25	2024-05-07
8	5	2	60	2024-05-08
9	1	3	150	2024-05-09
10	2	4	45	2024-05-10
11	3	5	75	2024-05-11
12	4	7	30	2024-05-12
13	5	8	20	2024-05-13
14	1	9	50	2024-05-14
15	2	10	10	2024-05-15
16	3	11	5	2024-05-16
\.


--
-- TOC entry 3413 (class 0 OID 52351)
-- Dependencies: 210
-- Data for Name: doadores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doadores (doador_id, nome, telefone, endereco, email) FROM stdin;
1	João da Silva	51987654321	Rua das Flores, 123, Porto Alegre, RS	joao.silva@gmail.com
2	Maria Oliveira	51987654322	Avenida Brasil, 456, Canoas, RS	maria.oliveira@yahoo.com
3	Pedro Souza	51987654323	Rua dos Andradas, 789, Gravataí, RS	pedro.souza@hotmail.com
4	Lucas Ferreira	51987654330	Rua Central, 400, Novo Hamburgo, RS	lucas.ferreira@gmail.com
5	Mariana Costa	51987654331	Avenida dos Estados, 500, São Leopoldo, RS	mariana.costa@yahoo.com
6	Gustavo Lima	51987654332	Rua Rio Branco, 600, Cachoeirinha, RS	gustavo.lima@hotmail.com
7	Fernanda Reis	51987654333	Rua São João, 700, Sapucaia do Sul, RS	fernanda.reis@gmail.com
8	Ricardo Gomes	51987654334	Avenida Farrapos, 800, Porto Alegre, RS	ricardo.gomes@yahoo.com
\.


--
-- TOC entry 3425 (class 0 OID 52419)
-- Dependencies: 222
-- Data for Name: estoques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estoques (estoque_id, ponto_id, tipo_id, quantidade) FROM stdin;
1	1	1	150
2	1	2	200
3	2	3	100
4	2	4	50
5	3	5	80
6	3	6	120
7	1	7	40
8	1	8	30
9	2	9	50
10	2	10	20
11	3	11	15
12	3	1	60
13	4	2	70
14	4	3	90
15	5	4	80
16	5	5	65
\.


--
-- TOC entry 3421 (class 0 OID 52393)
-- Dependencies: 218
-- Data for Name: necessidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.necessidades (necessidade_id, solicitante_id, tipo_id, quantidade) FROM stdin;
1	1	1	10
2	1	2	20
3	2	3	15
4	2	4	5
5	3	5	10
6	3	6	8
7	4	1	5
8	4	2	12
9	5	3	8
10	5	4	20
11	1	5	7
12	2	6	14
13	3	7	10
14	4	8	4
15	5	9	15
16	1	10	6
\.


--
-- TOC entry 3423 (class 0 OID 52410)
-- Dependencies: 220
-- Data for Name: pontos_coleta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pontos_coleta (ponto_id, nome, endereco, telefone) FROM stdin;
1	Centro de Coleta Porto Alegre	Avenida Independência, 1000, Porto Alegre, RS	51987654327
2	Centro de Coleta Canoas	Rua XV de Novembro, 500, Canoas, RS	51987654328
3	Centro de Coleta Gravataí	Avenida Dorival Cândido Luz, 300, Gravataí, RS	51987654329
4	Centro de Coleta Novo Hamburgo	Rua Primeiro de Março, 150, Novo Hamburgo, RS	51987654340
5	Centro de Coleta São Leopoldo	Avenida Dom João Becker, 250, São Leopoldo, RS	51987654341
6	Centro de Coleta Cachoeirinha	Rua Papa João XXIII, 350, Cachoeirinha, RS	51987654342
7	Centro de Coleta Sapucaia do Sul	Avenida Sapucaia, 450, Sapucaia do Sul, RS	51987654343
8	Centro de Coleta Pelotas	Rua Andrade Neves, 550, Pelotas, RS	51987654344
\.


--
-- TOC entry 3419 (class 0 OID 52384)
-- Dependencies: 216
-- Data for Name: solicitantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitantes (solicitante_id, nome, telefone, endereco, email) FROM stdin;
1	Carlos Pereira	51987654324	Rua da Praia, 101, Porto Alegre, RS	carlos.pereira@gmail.com
2	Ana Martins	51987654325	Rua Bento Gonçalves, 202, Viamão, RS	ana.martins@yahoo.com
3	Fernanda Alves	51987654326	Rua Dom Pedro II, 303, Alvorada, RS	fernanda.alves@hotmail.com
4	Beatriz Santos	51987654335	Rua João Pessoa, 111, Pelotas, RS	beatriz.santos@gmail.com
5	Carlos Henrique	51987654336	Rua Duque de Caxias, 222, Santa Maria, RS	carlos.henrique@yahoo.com
6	Amanda Vieira	51987654337	Avenida Getúlio Vargas, 333, Rio Grande, RS	amanda.vieira@hotmail.com
7	Juliana Mendes	51987654338	Rua Voluntários da Pátria, 444, Caxias do Sul, RS	juliana.mendes@gmail.com
8	Felipe Barbosa	51987654339	Avenida Ipiranga, 555, Porto Alegre, RS	felipe.barbosa@yahoo.com
\.


--
-- TOC entry 3415 (class 0 OID 52360)
-- Dependencies: 212
-- Data for Name: tipos_doacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipos_doacao (tipo_id, descricao) FROM stdin;
1	Roupa
2	Comida
3	Produtos de Higiene
4	Medicamentos
5	Materiais de Limpeza
6	Ração para Animais
7	Brinquedos
8	Calçados
9	Livros
10	Cobertores
11	Móveis
\.


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 223
-- Name: animais_resgatados_animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animais_resgatados_animal_id_seq', 10, true);


--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 213
-- Name: doacoes_doacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doacoes_doacao_id_seq', 16, true);


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 209
-- Name: doadores_doador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doadores_doador_id_seq', 8, true);


--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 221
-- Name: estoques_estoque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estoques_estoque_id_seq', 16, true);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 217
-- Name: necessidades_necessidade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.necessidades_necessidade_id_seq', 16, true);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 219
-- Name: pontos_coleta_ponto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pontos_coleta_ponto_id_seq', 8, true);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 215
-- Name: solicitantes_solicitante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitantes_solicitante_id_seq', 8, true);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 211
-- Name: tipos_doacao_tipo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipos_doacao_tipo_id_seq', 11, true);


--
-- TOC entry 3266 (class 2606 OID 52442)
-- Name: animais_resgatados animais_resgatados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animais_resgatados
    ADD CONSTRAINT animais_resgatados_pkey PRIMARY KEY (animal_id);


--
-- TOC entry 3256 (class 2606 OID 52372)
-- Name: doacoes doacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doacoes
    ADD CONSTRAINT doacoes_pkey PRIMARY KEY (doacao_id);


--
-- TOC entry 3252 (class 2606 OID 52358)
-- Name: doadores doadores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doadores
    ADD CONSTRAINT doadores_pkey PRIMARY KEY (doador_id);


--
-- TOC entry 3264 (class 2606 OID 52424)
-- Name: estoques estoques_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoques
    ADD CONSTRAINT estoques_pkey PRIMARY KEY (estoque_id);


--
-- TOC entry 3260 (class 2606 OID 52398)
-- Name: necessidades necessidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.necessidades
    ADD CONSTRAINT necessidades_pkey PRIMARY KEY (necessidade_id);


--
-- TOC entry 3262 (class 2606 OID 52417)
-- Name: pontos_coleta pontos_coleta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pontos_coleta
    ADD CONSTRAINT pontos_coleta_pkey PRIMARY KEY (ponto_id);


--
-- TOC entry 3258 (class 2606 OID 52391)
-- Name: solicitantes solicitantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitantes
    ADD CONSTRAINT solicitantes_pkey PRIMARY KEY (solicitante_id);


--
-- TOC entry 3254 (class 2606 OID 52365)
-- Name: tipos_doacao tipos_doacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipos_doacao
    ADD CONSTRAINT tipos_doacao_pkey PRIMARY KEY (tipo_id);


--
-- TOC entry 3267 (class 2606 OID 52373)
-- Name: doacoes doacoes_doador_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doacoes
    ADD CONSTRAINT doacoes_doador_id_fkey FOREIGN KEY (doador_id) REFERENCES public.doadores(doador_id);


--
-- TOC entry 3268 (class 2606 OID 52378)
-- Name: doacoes doacoes_tipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doacoes
    ADD CONSTRAINT doacoes_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipos_doacao(tipo_id);


--
-- TOC entry 3271 (class 2606 OID 52425)
-- Name: estoques estoques_ponto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoques
    ADD CONSTRAINT estoques_ponto_id_fkey FOREIGN KEY (ponto_id) REFERENCES public.pontos_coleta(ponto_id);


--
-- TOC entry 3272 (class 2606 OID 52430)
-- Name: estoques estoques_tipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estoques
    ADD CONSTRAINT estoques_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipos_doacao(tipo_id);


--
-- TOC entry 3269 (class 2606 OID 52399)
-- Name: necessidades necessidades_solicitante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.necessidades
    ADD CONSTRAINT necessidades_solicitante_id_fkey FOREIGN KEY (solicitante_id) REFERENCES public.solicitantes(solicitante_id);


--
-- TOC entry 3270 (class 2606 OID 52404)
-- Name: necessidades necessidades_tipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.necessidades
    ADD CONSTRAINT necessidades_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipos_doacao(tipo_id);


-- Completed on 2024-05-27 11:05:59 -03

--
-- PostgreSQL database dump complete
--

