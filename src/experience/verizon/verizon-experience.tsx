export type CollabBoardExperienceItem = {
    problem: string;
    solution: JSX.Element;
    image: string;
    imageAlt: string;
}

export const COLLAB_BOARD_EXPERIENCE: CollabBoardExperienceItem[] = [
    {
        problem: 'When a user is adding text or resizing a shape, the text can overflow and get cut off, requiring the user to manually resize the shape or find a text size that does not overflow. The product owner and design team had not devised a specified solution when this JIRA ticket was assigned to me.',
        solution: <>
            Upon reviewing other whiteboarding apps&apos; approach to this issue,
            I found their solutions unsatisfactory. Some apps locked the aspect ratio of a given shape,
            allowing the text to scale proportionally to the size of the shape but restricting the user's
            creative freedom. Some apps showed an indicator when the text was overflowing, alerting the user to
            either resize the shape or adjust the font size, which is inconvenient by requiring additional
            intervention by the user as well as adding an additional "undo" action to the user&apos;s undo/redo history.
            <p>
                After considering these options, I felt they were both lacking and instead devised an algorithm that
                would detect when the text begins to overflow and reduce the font size until the overflow was eliminated.
                This feature was very well received in customer feedback and NPS scores.
            </p>
        </>,
        image: './img/AutoText.gif',
        imageAlt: 'Text resizes automatically to fit the drawing container'
    },
    {
        problem: 'Users needed a quick and easy way to achieve pixel-perfect alignment of drawings when creating flowcharts and other whiteboard documents.',
        solution: <>In addition to implementing a function to align multiple selected drawings along their left,
            right, top, bottom, or center axis, I also considered that "grouped" drawings should be treated as a
            single unit, maintaining their position relative to their groupmates. I also built the toolbar menu
            for quick access to the new alignment features.
        </>,
        image: './img/GroupAlign.gif',
        imageAlt: 'Easy alignment of multiple selected drawings',
    },
    {
        problem: "Users needed an effortless way to control the relative size and aspect ratio of individual shapes that make up a whiteboard.",
        solution: <>I developed three features to greatly enhance the user experience when scaling shapes.
            <p>
            First was the creation of perfectly squared drawings by holding the shift key while resizing, or
            double click any of the resize handles of a drawing to instantly square the aspect ratio of the
            drawing along the clicked axis.
            </p>
            <p>
                Second was creation of perfectly straight lines along an x or y
                axis by holding the shift key while drawing.
            </p>
            <p>
                Third was displaying a popper with the pixel width and
                height of the drawing while creating or resizing, allowing for superb control over the relative sizes
                of shapes on the board.
            </p>
        </>,
        image: './img/PerfectDimensions.gif',
        imageAlt: "Holding shift while creating a drawing creates a perfect square",
    },
    {
        problem: 'When a user wanted to reuse drawings they had spent time and effort creating, they had to duplicate the entire board and then make any desired changes. This was inconvenient and suffered the limitation of only being able to copy drawings from one source board.',
        solution: <>Working with a back-end developer, I developed the functionality to submit whiteboard
            drawing data and an HTML canvas screenshot to an api endpoint that would store the data as a reusable
            template. The user would simply lay out any drawings they want to reuse and then click a save button
            on the toolbar. The template would then appear on a modal I created, allowing the user one-click
            access to all of their reusable templates.
        </>,
        image: './img/Templates.gif',
        imageAlt: 'Place a predefined template anywhere on the canvas',
    },
    {
        problem: 'When creating flowcharts or other boards, users encountered situations where a change in proceedures necessitates changing a shape at a particular flowchart step. Replacing the shape involved creating a new shape, adding any text/styling, putting it in place of the removed shape and connecting any incoming/outgoing arrows to the new shape.',
        solution: <>I implemented a feature allowing a user to change a shape in-place without altering
            any styles or connections. I also developed a context-based toolbar menu to easily access changing
            one two-dimensional shape to another, or one connector line type to another.
        </>,
        image: './img/SwitchShape.gif',
        imageAlt: 'Change one shape to another with the click of a mouse',
    },
]