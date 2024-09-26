import { IconTemplateInterface } from '@/interfaces/iconInterfaces';
import Icon from './Icons';

const ChevronArrowDown = (props: IconTemplateInterface): JSX.Element => {
    return (
        <Icon
            viewBox="0 0 512 512"
            className={props.className}
            width={props.width}
            height={props.height}
        >
            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}

            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </Icon>
    );
};

export default ChevronArrowDown;
