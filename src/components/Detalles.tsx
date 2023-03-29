import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const fet = [
  {
    name: "Usabilidad",
    description:
      "Nuestra interfaz ha sido creada para tu comodidad, sientete libre de usarla.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Certificado SSL",
    description:
      "La pagina web cuenta con la seguridad SSL para el tratamiento de tu datos y que estos se encuentren Protegidos",
    icon: LockClosedIcon,
  },
  {
    name: "Peticiones Simples",
    description: "Realiza peticiones de manera sencilla y de forma rapida",
    icon: ArrowPathIcon,
  },
  {
    name: "Seguridad Avanzada",
    description:
      "Contamos con un excelente sistema de rutas protegidas contra posibles ataques al servidor.",
    icon: FingerPrintIcon,
  },
];

export const Detalles = () => {
  return (
    <div className="bg-white py-24 sm:py-32" id="detalles">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Detalles
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Todo lo que necesitas saber sobre esta aplicación
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Esta pagina cuenta con una amplias caracteristicas que permiten la
            seguridad y facil interactividad en los siguientes elementos
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {fet.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <div className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </div>
                <div className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
