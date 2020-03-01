import React from 'react';
import {StyleSheet, View, Text} from "react-native";

export default class Terms extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                alignContent: 'stretch',
                alignItems: 'center',
                paddingRight: 10,
                paddingLeft: 10,
                flex: 1,
                width: '100%'
            }}>
                <View>
                    <Text style={styles.title}>Relación contractual.</Text>
                    <Text style={styles.text}>
                        Los presentes Términos y Condiciones de uso (“los Términos y Condiciones”) regulan el acceso o
                        uso que usted haga, como persona natural o jurídica, de nuestra aplicación, página web,
                        productos y servicios (los “Servicios”) puestos a disposición por LLEVOLE, SOCIEDAD ANÓNIMA,
                        sociedad guatemalteca, de naturaleza mercantil, del domicilio de la ciudad y departamento de
                        Guatemala “LLEVOLE”.
                    </Text>
                    <Text style={styles.text}>POR FAVOR LEA DETENIDAMENTE LOS SIGUIENTES TÉRMINOS Y CONDICIONES ANTES DE
                        ACCEDER O UTILIZAR LOS SERVICIOS, CON EL PROPÓSITO DE ASEGURARSE DE QUE USTED ENTIENDE CADA
                        DISPOSICIÓN, LAS CUALES SE DESCRIBEN A CONTINUACIÓN.
                    </Text>
                    <Text style={styles.text}>
                        Mediante su acceso o uso de los Servicios usted acuerda obligarse al cumplimiento de los
                        presentes Términos y Condiciones, los cuales regulan la relación contractual entre usted y
                        LLEVOLE. Si usted no acepta estos Términos y Condiciones, no podrá acceder o usar los Servicios.
                    </Text>
                    <Text style={styles.text}>
                        LLEVOLE podrá poner fin de manera inmediata a estos Términos y Condiciones o cualquiera de los
                        Servicios respecto de usted o, en general, dejar de ofrecer o denegar el acceso o uso de los
                        Servicios de manera total o parcial, en cualquier momento y por cualquier motivo.
                    </Text>
                    <Text style={styles.text}>
                        LLEVOLE podrá modificar los presentes Términos y Condiciones relativos a los Servicios cuando lo
                        considere conveniente, con un simple aviso por cualquier medio a los usuarios.
                    </Text>
                    <Text style={styles.text}>
                        Las modificaciones serán efectivas después de la comunicación por parte de LLEVOLE bajo
                        cualquier modalidad de los Términos y Condiciones actualizados sobre el Servicio aplicable. Su
                        posterior acceso o uso continuado de los Servicios después de dicha comunicación constituye su
                        consentimiento tácito y vinculante hacia los presentes Términos y Condiciones y sus
                        modificaciones.
                    </Text>
                    <Text style={styles.text}>
                        La recopilación y el uso que hacemos de su información personal en relación con los Servicios
                        será tratada conforme a las políticas de privacidad de LLEVOLE, las cuales se pueden consultar
                        en los portales web o la aplicación.
                    </Text>
                    <Text style={styles.text}>
                        LLEVOLE podrá facilitar aquella información personal cuando se vea obligado a suministrarla para
                        atender una orden administrativa o judicial emitida por una autoridad competente.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Los servicios.</Text>
                    <Text style={styles.text}>
                        Los Servicios constituyen una plataforma de tecnología que permite a los usuarios de
                        aplicaciones móviles de LLEVOLE o páginas web proporcionadas como parte de los Servicios (cada
                        una, una “Aplicación”) ordenar la entrega a domicilio de comida, bebidas, medicamentos, así como
                        de artículos de venta en supermercados y en tiendas de conveniencia, en algunos casos, mediante
                        terceros proveedores independientes de dichos servicios, incluidos terceros prestadores
                        particulares independientes de servicios de transporte privado y terceros proveedores logísticos
                        independientes, conforme a un acuerdo con LLEVOLE o algunos afiliados de LLEVOLE (“Terceros
                        proveedores”).
                    </Text>
                    <Text style={styles.text}>
                        A no ser que LLEVOLE lo acepte mediante un contrato separado por escrito con usted, los
                        Servicios se ponen a disposición solo para su uso personal, no comercial.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Licencia.</Text>
                    <Text style={styles.text}>
                        Sujeto al cumplimiento de estos Términos y Condiciones, LLEVOLE le otorga una licencia limitada,
                        no exclusiva, no sublicenciable, revocable, y no transferible para: (i) el acceso y uso de las
                        Aplicaciones en su dispositivo personal solo en relación con su uso de los Servicios; y (ii) el
                        acceso y uso de cualquier contenido, información y material relacionado que pueda ponerse a
                        disposición a través de los Servicios, en cada caso solo para su uso personal, no comercial.
                        LLEVOLE y sus licenciantes se reservan cualquier derecho que no haya sido expresamente otorgado
                        por el presente.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Restricciones.</Text>
                    <Text style={styles.text}>
                        Usted no podrá: (i) reproducir, modificar, preparar obras derivadas sobre los Servicios,
                        distribuir, licenciar, arrendar, revender, transferir, exhibir públicamente, presentar
                        públicamente, transmitir, retransmitir o explotar de otra forma los Servicios, excepto cuando
                        esto sea permitido expresamente por LLEVOLE; o (ii) intentar obtener un acceso no autorizado o
                        dañar cualquier aspecto de los Servicios o sus sistemas o redes relacionados.
                    </Text>
                    <Text style={styles.text}>
                        Los Servicios y todos los derechos relativos a estos son y permanecerán como propiedad de
                        LLEVOLE o de sus licenciantes, en las formas y tiempos en los que LLEVOLE determine. Ninguno de
                        estos Términos y Condiciones ni su uso de los Servicios le transfiere u otorgan ningún derecho:
                        (i) sobre o en relación con los Servicios, excepto en cuanto a la licencia limitada otorgada
                        anteriormente; o bien (ii) a utilizar o mencionar en cualquier modo los nombres de la empresa,
                        logotipos, nombres de producto y servicio, marcas comerciales o marcas de servicio de LLEVOLE o
                        de sus licenciantes.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Su uso de los servicios</Text>
                    <Text style={styles.subTitle}>Cuentas de usuario.</Text>
                    <Text style={styles.text}>
                        Con el fin de usar la mayor parte de los aspectos de los Servicios, usted debe registrarse y
                        mantener activa una cuenta personal de usuario de los Servicios (“Cuenta”). Para obtener una
                        Cuenta debe tener como mínimo 18 años.
                    </Text>
                    <Text style={styles.text}>
                        El registro de la cuenta le requiere que comunique a LLEVOLE determinada información personal,
                        como su nombre, dirección, NIT, número de teléfono móvil, así como por lo menos un método de
                        pago válido (bien una tarjeta de crédito o bien un socio de pago aceptado).
                    </Text>
                    <Text style={styles.text}>
                        Usted se compromete a mantener la información en su Cuenta de forma exacta, completa y
                        actualizada. Si no mantiene la información de Cuenta de forma exacta, completa y actualizada,
                        incluso el tener un método de pago inválido o que haya vencido, podrá resultar en su
                        imposibilidad para acceder y utilizar los Servicios o en la resolución por parte de LLEVOLE de
                        estos Términos y Condiciones.
                    </Text>
                    <Text style={styles.text}>
                        Usted es responsable de toda la actividad que ocurre en su Cuenta y se compromete a mantener en
                        todo momento de forma segura y secreta el nombre de usuario y la contraseña de su Cuenta. A
                        menos que LLEVOLE permita otra cosa por escrito, usted solo puede poseer una Cuenta.
                        LLEVOLE se reserva el derecho de poner a disposición diferentes tipos de cuentas para distintos
                        tipos de usuarios. LLEVOLE podrá, a su sola discreción, crear, mantener y administrar estos
                        distintos tipos de cuenta. Su cuenta le da acceso para el uso de los Servicios y funcionalidades
                        que podemos crear y mantener de tiempo en tiempo bajo nuestra sola discreción. Si al abrir una
                        cuenta con nosotros, usted lo hace en nombre de una persona jurídica, tal y como una sociedad,
                        asociación, fundación u otro tipo entidad, usted declara y garantiza tener las facultades de
                        acuerdo con la legislación aplicable necesarias para aceptar y por ende obligar a dicha persona
                        jurídica a los presentes Términos y Condiciones. LLEVOLE se reserva el derecho de solicitar la
                        documentación legal que compruebe la personería jurídica con la cual actúa en nombre y
                        representación de dicha entidad.
                    </Text>
                    <Text style={styles.subTitle}>Requisitos y conducta del usuario.</Text>
                    <Text style={styles.text}>
                        El Servicio no está disponible para el uso de personas menores de 18 años. Usted no podrá
                        autorizar a terceros a utilizar su Cuenta, asimismo no podrá permitir a personas menores de 18
                        años que reciban los Servicios, a menos que ellos sean acompañados por usted. No podrá ceder o
                        transferir de otro modo su Cuenta a cualquier otra persona o entidad. Usted acuerda cumplir con
                        todas las leyes aplicables al utilizar los Servicios y solo podrá utilizar los Servicios con
                        fines legítimos (p. ej., no para el transporte de materiales ilegales o peligrosos). En algunos
                        casos, LLEVOLE podrá denegar el uso de los Servicios si en el cumplimiento de los mismos ello
                        pudiese significar un riesgo para sus empleados o para los Terceros proveedores (p. ej., el
                        ingreso a zonas con presencia de grupos delictivos y/o terroristas). Asimismo, se le podrá
                        requerir que facilite un documento de identidad para el acceso o uso de los Servicios, y usted
                        acepta que se le podrá denegar el acceso o uso de los Servicios si se niega a facilitar el
                        documento de identidad.
                    </Text>
                    <Text style={styles.subTitle}>Contenido proporcionado por el Usuario.</Text>
                    <Text style={styles.text}>
                        LLEVOLE podrá, a su sola discreción, permitirle cuando considere oportuno, que envíe, cargue,
                        publique o de otro modo ponga a disposición de LLEVOLE a través de los Servicios contenido e
                        información de texto, audio y/o visual, incluidos comentarios y opiniones relativos a los
                        Servicios, iniciación de peticiones de apoyo, así como presentación de admisiones para
                        competiciones y promociones (“Contenido de usuario”). Todo Contenido de usuario facilitado por
                        usted seguirá siendo de su propiedad.
                    </Text>
                    <Text style={styles.text}>
                        No obstante, al proporcionar Contenido de usuario a LLEVOLE, usted otorga una licencia mundial,
                        perpetua, irrevocable, transferible, libre de regalías, con derecho a sublicenciar, usar,
                        copiar, modificar, crear obras derivadas, distribuir, exhibir públicamente, presentar
                        públicamente o de otro modo explotar de cualquier manera dicho Contenido de usuario en todos los
                        formatos y canales de distribución, conocidos ahora o ideados en un futuro (incluidos en
                        relación con los Servicios y el negocio de LLEVOLE y en sitios y servicios de terceros), sin más
                        aviso o consentimiento de usted y sin requerirse el pago a usted o a cualquier otra persona o
                        entidad.
                    </Text>
                    <Text style={styles.text}>
                        Usted declara y garantiza que: (i) es el único y exclusivo propietario de todo el Contenido de
                        usuario o que tiene todos los derechos, licencias, consentimientos y permisos necesarios para
                        otorgar a LLEVOLE la licencia al Contenido de usuario como establecido anteriormente; y (ii) ni
                        el Contenido de usuario ni su presentación, carga, publicación o puesta a disposición de otro
                        modo de dicho Contenido de usuario, ni el uso por parte de LLEVOLE del Contenido de usuario como
                        está aquí permitido, infringirán, malversarán o violarán la propiedad intelectual o los derechos
                        de propiedad de un tercero o los derechos de publicidad o privacidad o resultarán en la
                        violación de cualquier ley o reglamento aplicable.
                    </Text>
                    <Text style={styles.text}>
                        Usted acuerda no proporcionar Contenido de usuario que sea difamatorio, calumnioso, odioso,
                        violento, obsceno, pornográfico, ilícito o de otro modo ofensivo, como determine LLEVOLE, a su
                        sola discreción, tanto si dicho material pueda estar protegido o no por la ley. LLEVOLE podrá, a
                        su sola discreción y en cualquier momento y por cualquier motivo, sin avisarle previamente,
                        revisar, controlar o eliminar Contenido de usuario, pero sin estar obligado a ello.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Acceso a la red y dispositivos.</Text>
                    <Text style={styles.text}>
                        Usted es responsable de obtener el acceso a la red de datos necesario para utilizar los
                        Servicios. Podrán aplicarse las tarifas y tasas de datos y mensajes de su red móvil si usted
                        accede o utiliza los Servicios desde un dispositivo móvil y usted será responsable de dichas
                        tarifas y tasas.
                    </Text>
                    <Text style={styles.text}>
                        Usted es responsable de adquirir y actualizar el hardware compatible o los dispositivos
                        necesarios para acceder y utilizar los Servicios y Aplicaciones y cualquier actualización de
                        estos. LLEVOLE no garantiza que los Servicios, o cualquier parte de estos, funcionen en
                        cualquier hardware o dispositivo particular. Además, los Servicios podrán ser objeto de
                        disfunciones o retrasos inherentes al uso de Internet y de las comunicaciones electrónicas.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Pago</Text>
                    <Text style={styles.text}>
                        Usted entiende que el uso de los Servicios puede derivar en cargos por los Servicios o bienes
                        que reciba de LLEVOLE o de un Tercero proveedor (“Cargos”). Después de que haya recibido los
                        servicios u obtenido los bienes mediante el uso de los Servicios, LLEVOLE facilitará su pago de
                        los Cargos aplicables en nombre del Tercero proveedor como agente de cobro limitado del Tercero
                        proveedor. El pago de los Cargos de dicha manera se considerará como el pago efectuado
                        directamente por usted al Tercero proveedor. Los Cargos incluirán los impuestos aplicables
                        cuando se requiera por ley. Los Cargos pagados por usted son definitivos y no reembolsables, a
                        menos que LLEVOLE determine lo contrario.
                    </Text>
                    <Text style={styles.text}>
                        Todos los Cargos son pagaderos inmediatamente y el pago se facilitará por LLEVOLE utilizando el
                        método de pago preferido indicado en su Cuenta, y después de ello LLEVOLE le enviará un recibo
                        por correo electrónico. Si se determina que el método de pago de su Cuenta principal ha
                        caducado, es inválido o de otro modo no sirve para cobrarle, usted acepta que LLEVOLE, como
                        agente de cobro limitado del Tercero proveedor, utilice un método de pago secundario en su
                        Cuenta, si estuviera disponible.
                    </Text>
                    <Text style={styles.text}>
                        Si por algún motivo o circunstancia El Usuario cancela su pedido en el caso que dicha causa no
                        fuera atribuible a LLEVOLE, AUTORIZA sin prejuicio alguno a que LLEVOLE le retenga en su tarjeta
                        de débito o crédito la cantidad de la transacción por un periodo de TREINTA días, y LLEVOLE
                        pondrá a disposición del USUARIO a solicitarlo nuevamente únicamente en ese mismo periodo, pero
                        siempre y cuando el pedido u orden no haya sido elaborado por el comercio afiliado y despachado
                        los cuales no serán reembolsables.
                    </Text>
                    <Text style={styles.text}>
                        Si el USUARIO ha escogido la forma de pago en efectivo y por algún motivo o circunstancia
                        cancela su pedido siempre y cuando la causa no fuera atribuible a LLEVOLE, AUTORIZA sin
                        prejuicio alguno a que LLEVOLE lo coloque en cuentas pendientes de debitar.
                    </Text>
                    <Text style={styles.text}>
                        LLEVOLE, en cualquier momento y a su sola discreción, se reserva el derecho de establecer,
                        eliminar y/o revisar los Cargos para alguno o todos los servicios o bienes obtenidos a través
                        del uso de los Servicios. Además, usted reconoce y acepta que los Cargos aplicables en
                        determinadas zonas geográficas podrán incrementar sustancialmente dependiendo de la distancia de
                        estas zonas geográficas. Usted podrá optar por cancelar su solicitud para los servicios o bienes
                        de un Tercero proveedor si han transcurrido menos de 2 minutos después de haber solicitado
                        dichos servicios o bienes, en cuyo caso se le podrá cobrar una tasa de cancelación. Sin embargo,
                        usted no tiene derecho a ningún reembolso por cancelación una vez el comercio haya aceptado la
                        orden. LLEVOLE ofrece reembolsos por compras a su sola discreción. En el caso que LLEVOLE
                        suspenda o cancele su cuenta, se den por terminados los presentes Términos y Condiciones, o
                        cambie la propiedad de LLEVOLE, usted entiende y acepta que NO recibirá ningún reembolso o
                        indemnización por ello, o por cualquier contenido o datos asociados con su cuenta, o para
                        cualquier otra cosa, excepto si LLEVOLE está de acuerdo con ello bajo su sola discreción.
                    </Text>
                    <Text style={styles.text}>
                        Esta estructura de pago está destinada para compensar plenamente al Tercero proveedor por los
                        servicios o bienes proporcionados. LLEVOLE no designa ninguna parte de su pago como propina o
                        gratificación al Tercero proveedor. Usted entiende y acepta que, mientras es libre de
                        proporcionar un pago adicional como gratificación a cualquier Tercero proveedor que le
                        proporcione servicios o bienes obtenidos mediante el Servicios, no tiene obligación de ello. Las
                        gratificaciones son voluntarias. Después de que haya recibido los bienes o servicios obtenidos a
                        través del Servicio, tendrá la oportunidad de calificar su experiencia y dejar comentarios
                        adicionales sobre LLEVOLE y el Tercero proveedor.
                    </Text>
                </View>
                <View>
                    <Text style={styles.title}>Renuncias; Limitación de responsabilidad; Indemnidad.</Text>
                    <Text style={styles.subTitle}>RENUNCIA.</Text>
                    <Text style={styles.text}>
                        LLEVOLE RENUNCIA A TODA DECLARACIÓN Y GARANTÍA, EXPRESA, IMPLÍCITA O ESTATUTARIA, NO
                        EXPRESAMENTE ESTABLECIDA EN ESTOS TÉRMINOS Y CONDICIONES, INCLUIDAS LAS GARANTÍAS IMPLÍCITAS DE
                        COMERCIABILIDAD, IDONEIDAD PARA UN FIN PARTICULAR Y NO VIOLACIÓN. ADEMÁS, LLEVOLE NO HACE
                        DECLARACIÓN NI PRESTA GARANTÍA ALGUNA RELATIVA A LA FIABILIDAD, PUNTUALIDAD, CALIDAD, IDONEIDAD
                        O DISPONIBILIDAD DE LOS SERVICIOS O CUALQUIERA DE LOS SERVICIOS O BIENES SOLICITADOS A TRAVÉS
                        DEL USO DE LOS SERVICIOS, O QUE LOS SERVICIOS NO SERÁN INTERRUMPIDOS O ESTARÁN LIBRES DE
                        ERRORES. LLEVOLE NO GARANTIZA LA CALIDAD, IDONEIDAD, SEGURIDAD O HABILIDAD DE LOS TERCEROS
                        PROVEEDORES. USTED ACUERDA QUE TODO RIESGO DERIVADO DE SU USO DE LOS SERVICIOS Y CUALQUIER
                        SERVICIO O BIEN SOLICITADO EN RELACIÓN CON AQUELLOS SERÁ ÚNICAMENTE SUYO, EN LA MÁXIMA MEDIDA
                        PERMITIDA POR LA LEY APLICABLE.
                    </Text>
                    <Text style={styles.subTitle}>LIMITACIÓN DE RESPONSABILIDAD.</Text>
                    <Text style={styles.text}>
                        LLEVOLE NO SERÁ RESPONSABLE DE DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, EJEMPLARES, PUNITIVOS
                        O EMERGENTES, INCLUIDOS EL LUCRO CESANTE, LA PÉRDIDA DE DATOS, LA LESIÓN PERSONAL O EL DAÑO A LA
                        PROPIEDAD, NI DE PERJUICIOS RELATIVOS, O EN RELACIÓN CON, O DE OTRO MODO DERIVADOS DE CUALQUIER
                        USO DE LOS SERVICIOS, INCLUSO AUNQUE LLEVOLE HAYA SIDO ADVERTIDO DE LA POSIBILIDAD DE DICHOS
                        DAÑOS. LLEVOLE NO SERÁ RESPONSABLE DE CUALQUIER DAÑO, RESPONSABILIDAD O PÉRDIDA QUE DERIVEN DE:
                        (I) SU USO O DEPENDENCIA DE LOS SERVICIOS O SU INCAPACIDAD PARA ACCEDER O UTILIZAR LOS
                        SERVICIOS; O (ii) CUALQUIER TRANSACCIÓN O RELACIÓN ENTRE USTED Y CUALQUIER TERCERO PROVEEDOR,
                        AUNQUE LLEVOLE HUBIERA SIDO ADVERTIDO DE LA POSIBILIDAD DE DICHOS DAÑOS. LLEVOLE NO SERÁ
                        RESPONSABLE DEL RETRASO O DE LA FALTA DE EJECUCIÓN RESULTANTE DE CAUSAS QUE VAYAN MÁS ALLÁ DEL
                        CONTROL RAZONABLE DE LLEVOLE.
                        LAS LIMITACIONES Y LA RENUNCIA EN ESTE APARTADO 5 NO PRETENDEN LIMITAR LA RESPONSABILIDAD O
                        ALTERAR SUS DERECHOS COMO CONSUMIDOR QUE NO PUEDAN EXCLUIRSE SEGÚN LA LEY APLICABLE.
                    </Text>
                    <Text style={styles.subTitle}>Indemnidad.</Text>
                    <Text style={styles.text}>
                        Usted acuerda mantener indemnes y responder frente a LLEVOLE y sus consejeros, directivos,
                        empleados y agentes por cualquier reclamación, demanda, pérdida, responsabilidad y gasto
                        (incluidos los honorarios de abogados) que deriven de: (i) su uso de los Servicios o servicios o
                        bienes obtenidos a través de su uso de los Servicios; (ii) su incumplimiento o violación de
                        cualquiera de estos Términos y Condiciones; (iii) el uso por parte de LLEVOLE de su Contenido de
                        usuario; o (iv) su infracción de los derechos de cualquier tercero, incluidos Terceros
                        proveedores.
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        alignContent: 'flex-start'
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 15,
        alignContent: 'flex-start'
    },
    text: {
        fontSize: 10,
        paddingBottom: 15,
        alignContent: 'stretch'
    }
});
