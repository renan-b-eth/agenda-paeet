-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "escola" TEXT NOT NULL DEFAULT '',
    "cursoTecnico" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estagiario" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cursoSerie" TEXT NOT NULL DEFAULT '',
    "ra" TEXT NOT NULL DEFAULT '',
    "empresa" TEXT NOT NULL DEFAULT '',
    "responsavelEmpresa" TEXT NOT NULL DEFAULT '',
    "telResponsavel" TEXT NOT NULL DEFAULT '',
    "dataInicio" TIMESTAMP(3),
    "dataTermino" TIMESTAMP(3),

    CONSTRAINT "Estagiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FichaApoio" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frequencia" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "provaPaulista1Bim" DOUBLE PRECISION,
    "provaPaulista2Bim" DOUBLE PRECISION,
    "provaPaulista3Bim" DOUBLE PRECISION,
    "habilidadesDefasagem" TEXT NOT NULL DEFAULT '',
    "encaminhamentos" TEXT NOT NULL DEFAULT '',
    "prazo" TIMESTAMP(3),
    "evidencia" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "FichaApoio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroEstagio" (
    "id" TEXT NOT NULL,
    "estagiarioId" TEXT NOT NULL,
    "dia" TIMESTAMP(3) NOT NULL,
    "atividadeDesenvolvida" TEXT NOT NULL DEFAULT '',
    "assinaturaResponsavel" BOOLEAN NOT NULL DEFAULT false,
    "assinaturaEstagiario" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RegistroEstagio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL DEFAULT '',
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TEXT NOT NULL DEFAULT '',
    "origem" TEXT NOT NULL DEFAULT 'MANUAL',
    "concluido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "turma" TEXT NOT NULL DEFAULT '',
    "curso" TEXT NOT NULL DEFAULT '',
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyAgendaSlot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "weekEnd" TIMESTAMP(3) NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "activity" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "WeeklyAgendaSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_userId_endpoint_key" ON "PushSubscription"("userId", "endpoint");

-- CreateIndex
CREATE UNIQUE INDEX "RegistroEstagio_estagiarioId_dia_key" ON "RegistroEstagio"("estagiarioId", "dia");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyAgendaSlot_userId_weekStart_dayOfWeek_period_key" ON "WeeklyAgendaSlot"("userId", "weekStart", "dayOfWeek", "period");

-- AddForeignKey
ALTER TABLE "Estagiario" ADD CONSTRAINT "Estagiario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FichaApoio" ADD CONSTRAINT "FichaApoio_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PushSubscription" ADD CONSTRAINT "PushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroEstagio" ADD CONSTRAINT "RegistroEstagio_estagiarioId_fkey" FOREIGN KEY ("estagiarioId") REFERENCES "Estagiario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyAgendaSlot" ADD CONSTRAINT "WeeklyAgendaSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

