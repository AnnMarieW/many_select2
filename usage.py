import many_select2
import dash_mantine_components as dmc
from dash import Dash, _dash_renderer

_dash_renderer._set_react_version("18.2.0")

app = Dash()

app.layout = dmc.MantineProvider(
    children=[
        dmc.Alert(
            "Welcome to Dash Mantine Components",
            title="Hello!",
            color="violet",
        ),
        many_select2.ManySelect2(),
    ]
)

if __name__ == "__main__":
    app.run(debug=True)